import {
  getAssetFromKV,
  mapRequestToAsset
} from "@cloudflare/kv-asset-handler";
import { MegaMillionsElementHandler } from "./megamillions/rewriter";
import { lottoFormatter, lottoGenerator } from "./megamillions/lotto";

/**
 * The DEBUG flag will do two things that help during development:
 * 1. we will skip caching on the edge, which makes it easier to
 *    debug.
 * 2. we will return an error message on exception in your Response rather
 *    than the default 404.html page.
 */
const DEBUG = false;

addEventListener("fetch", event => {
  try {
    event.respondWith(handleEvent(event));
  } catch (e) {
    if (DEBUG) {
      return event.respondWith(
        new Response(e.message || e.toString(), {
          status: 500
        })
      );
    }
    event.respondWith(new Response("Internal Error", { status: 500 }));
  }
});

async function handleEvent(event) {
  const url = new URL(event.request.url);
  let options = {
    browserTTL: 2 * 60 * 60 // 2 hours
  };

  try {
    if (DEBUG) {
      options.cacheControl = {
        bypassCache: true
      };
    }
    let response = await getAssetFromKV(event, options);
    const lottoNums = await lottoGenerator();
    const lottoStrings = lottoFormatter(lottoNums);
    const megaMillionsRewriter = new HTMLRewriter().on(
      `strong[mega-millions]`,
      new MegaMillionsElementHandler(lottoStrings)
    );
    return megaMillionsRewriter.transform(response);
  } catch (e) {
    if (!DEBUG) {
      try {
        let notFoundResponse = await getAssetFromKV(event, {
          mapRequestToAsset: req =>
            new Request(`${new URL(req.url).origin}/html/404.html`, req)
        });

        return new Response(notFoundResponse.body, {
          ...notFoundResponse,
          status: 404
        });
      } catch (e) {}
    }

    return new Response(e.message || e.toString(), { status: 500 });
  }
}

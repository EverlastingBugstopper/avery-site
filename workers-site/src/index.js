import {
  getAssetFromKV,
  mapRequestToAsset
} from "@cloudflare/kv-asset-handler";
import {
  MegaMillionsElementHandler,
  CopyStringRewriter
} from "./megamillions/rewriter";
import { lottoFormatter, lottoGenerator } from "./megamillions/lotto";

/**
 * The DEBUG flag will do two things that help during development:
 * 1. we will skip caching on the edge, which makes it easier to
 *    debug.
 * 2. we will return an error message on exception in your Response rather
 *    than the default 404.html page.
 */
const DEBUG = true;

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

function getBrowserTTL(url) {
  const ONE_MINUTE = 60;
  const ONE_HOUR = ONE_MINUTE * 60;
  const ONE_DAY = ONE_HOUR * 24;
  const ONE_MONTH = ONE_DAY * 30;
  if (url.pathname.includes("resources/img/clarktime")) {
    return ONE_MONTH;
  }
  return ONE_DAY;
}

async function handleEvent(event) {
  const url = new URL(event.request.url);
  let cacheControl = { browserTTL: getBrowserTTL(url) };
  let options = {
    cacheControl
  };

  if (DEBUG) {
    options.cacheControl = {
      bypassCache: true
    };
  }

  try {
    let response = await getAssetFromKV(event, options);
    const lottoNums = await lottoGenerator();
    const lottoStrings = lottoFormatter(lottoNums);
    const megaMillionsRewriter = new HTMLRewriter().on(
      `strong[mega-millions]`,
      new MegaMillionsElementHandler(lottoStrings)
    );
    const copyStringRewriter = new HTMLRewriter().on(
      `#nums-to-copy`,
      new CopyStringRewriter(lottoStrings)
    );
    response = await megaMillionsRewriter.transform(response);
    return copyStringRewriter.transform(response);
  } catch (e) {
    if (!DEBUG) {
      let notFoundResponse = await getAssetFromKV(event, {
        mapRequestToAsset: req =>
          new Request(`${new URL(req.url).origin}/resources/html/404.html`, req)
      });

      return new Response(notFoundResponse.body, {
        ...notFoundResponse,
        status: 404
      });
    }

    return new Response(e.message || e.toString(), { status: 500 });
  }
}

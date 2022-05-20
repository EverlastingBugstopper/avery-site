import { ElementJar } from "./element.mjs";
import { LightingManager } from "./lighting.mjs";
import { EmojiPresenter } from "./emoji.mjs";

// this function creates an element jar of _🧪 potentially reactive elements_
const forageForElements = () => {
  const elementInits = [
    { DOMId: "title-emoji" },
    { DOMId: "emoji-play-pause" },
    { DOMId: "site-emoji" },
    { DOMId: "lighting-mode-switch" },
    { id: "body", handle: window.document.body },
    {
      id: "dark-query",
      handle: window.matchMedia("(prefers-color-scheme: dark)"),
    },
    {
      id: "light-query",
      handle: window.matchMedia("(prefers-color-scheme: light)"),
    },
    {
      id: "reduced-motion-query",
      handle: window.matchMedia("(prefers-reduced-motion: reduce)"),
    },
    {
      id: "no-preference-query",
      handle: window.matchMedia("(prefers-reduced-motion: no-preference)"),
    },
  ];
  return new ElementJar(elementInits);
};

// this function creates the interactive handlers we need
const setup = () => {
  const elementJar = forageForElements();
  return [
    new LightingManager(
      elementJar.scoop([
        "lighting-mode-switch",
        "body",
        "light-query",
        "dark-query",
      ])
    ),
    new EmojiPresenter(
      elementJar.scoop(["title-emoji", "site-emoji"]),
      elementJar.scoop(["emoji-play-pause"]),
      elementJar.scoop(["reduced-motion-query", "no-preference-query"])
    ),
  ];
};

// this function iterates over our interactive handlers and enables them
const start = () => {
  const actions = setup();
  for (const action of actions) {
    action.enable();
  }
};

// when the window loads, start handling events
window.onload = () => {
  start();
};

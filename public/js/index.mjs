import { ElementJar } from "./element.mjs";
import { LightingMode } from "./lighting.mjs";
import { EmojiSlideShow } from "./emoji.mjs";

window.onload = () => {
  const elementJar = new ElementJar(["spinning-emoji", "dark-mode-switch"]);
  const lightingMode = new LightingMode(elementJar.scoop("dark-mode-switch"));
  const emojiSlideshow = new EmojiSlideShow(elementJar.scoop("spinning-emoji"));
  lightingMode.enable();
  emojiSlideshow.party();
};

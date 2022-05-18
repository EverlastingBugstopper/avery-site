import { ElementJar } from "./element.mjs";
import { LightingMode } from "./lighting.mjs";
import { EmojiSlideShow } from "./emoji.mjs";
// import { HamburgerMenu } from "./hamburger.mjs";

const titleEmojiID = "title-emoji";
const siteEmojiID = "site-emoji";
const lightingModeSwitchID = "lighting-mode-switch";
// const menuSwitchID = "menu-switch";
// const navID = "navbar";

const forageForElements = () => {
  const elementIDs = [
    titleEmojiID,
    lightingModeSwitchID,
    siteEmojiID,
    // menuSwitchID,
    // navID,
  ];
  return new ElementJar(elementIDs);
};

const setup = () => {
  const elementJar = forageForElements();
  return [
    // new HamburgerMenu(elementJar.scoop([menuSwitchID, navID])),
    new LightingMode(elementJar.scoop(lightingModeSwitchID)),
    new EmojiSlideShow(elementJar.scoop([titleEmojiID, siteEmojiID])),
  ];
};

const start = () => {
  const actions = setup();
  for (const action of actions) {
    action.enable();
  }
};

window.onload = () => {
  start();
};

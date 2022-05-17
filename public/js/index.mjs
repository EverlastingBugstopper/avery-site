import { ElementJar } from "./element.mjs";
import { LightingMode } from "./lighting.mjs";
import { HamburgerMenu } from "./hamburger.mjs";
import { EmojiSlideShow } from "./emoji.mjs";

const titleEmojiID = "title-emoji";
const siteEmojiID = "site-emoji";
const menuSwitchID = "menu-switch";
const lightingModeSwitchID = "lighting-mode-switch";
const navID = "navbar";

const forageForElements = () => {
  const elementIDs = [
    titleEmojiID,
    lightingModeSwitchID,
    siteEmojiID,
    menuSwitchID,
    navID,
  ];
  return new ElementJar(elementIDs);
};

const setup = () => {
  const elementJar = forageForElements();
  return [
    new LightingMode(elementJar.scoop(lightingModeSwitchID)),
    new HamburgerMenu(elementJar.scoop([menuSwitchID, navID])),
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

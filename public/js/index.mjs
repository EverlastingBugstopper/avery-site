import { ElementJar } from "./element.mjs";
import { LightingMode } from "./lighting.mjs";
import { HamburgerMenu } from "./hamburger.mjs";
import { EmojiSlideShow } from "./emoji.mjs";

const spinningEmojiID = "spinning-emoji";
const menuSwitchID = "menu-switch";
const darkModeSwitchID = "dark-mode-switch";
const navID = "navbar";

const forageForElements = () => {
  const elementIDs = [spinningEmojiID, darkModeSwitchID, menuSwitchID, navID];
  return new ElementJar(elementIDs);
};

const setup = () => {
  const elementJar = forageForElements();
  return [
    new LightingMode(elementJar.scoop(darkModeSwitchID)),
    new HamburgerMenu(elementJar.scoop([menuSwitchID, navID])),
    new EmojiSlideShow(elementJar.scoop(spinningEmojiID)),
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

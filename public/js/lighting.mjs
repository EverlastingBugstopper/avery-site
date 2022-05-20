const MODE_KEY = "lighting-mode";

// controls light and dark mode on the website
class LightingManager {
  // create a lighting handler from a toggle element
  constructor([toggleElement, bodyElement, lightQuery, darkQuery]) {
    this.toggleElement = toggleElement;
    this.bodyElement = bodyElement;
    this.lightQuery = lightQuery;
    this.darkQuery = darkQuery;
    this.watching = false;
  }

  // if someone switches their OS level lighting mode
  // detect it and update accordingly
  watch() {
    if (!this.watching) {
      this.lightQuery.addListener((e) => e.matches && this.setLight());
      this.darkQuery.addListener((e) => e.matches && this.setDark());
      this.watching = true;
    }
  }

  // sets the lighting to dark mode
  setDark() {
    this.toggleElement.setInnerHTML("☀️");
    this.bodyElement.addClass("dark");
    this.bodyElement.removeClass("light");
    if (localStorage) {
      localStorage.setItem(MODE_KEY, "dark");
    }
    this.mode = "dark";
  }

  // set the lighting mode to light mode
  setLight() {
    this.toggleElement.setInnerHTML("🌜");
    this.bodyElement.addClass("light");
    this.bodyElement.removeClass("dark");
    if (localStorage) {
      localStorage.setItem(MODE_KEY, "light");
    }
    this.mode = "light";
  }

  // check if the lighting mode is dark
  isDark() {
    return this.mode === "dark";
  }

  // check if the lighting mode is light
  isLight() {
    return this.mode === "light";
  }

  // swap between light and dark mode
  toggle() {
    if (this.isLight()) {
      this.setDark();
    } else if (this.isDark()) {
      this.setLight();
    } else {
      this.setLight();
    }
  }

  enable() {
    this.toggleElement.enable();
    this.toggleElement.listenForClick(() => this.toggle());
    this.watch();
    // first, check local storage
    const storedMode = localStorage && localStorage.getItem(MODE_KEY);
    if (!storedMode) {
      // if it's not in localStorage, check their OS level settings
      if (window.matchMedia) {
        if (this.darkQuery.matches) {
          this.setDark();
        } else if (this.lightQuery.matches) {
          this.setLight();
        }
      }
    } else if (storedMode === "light") {
      // if it is in localStorage, apply their settings
      this.setLight();
    } else if (storedMode === "dark") {
      this.setDark();
    }
    if (!this.mode) {
      // otherwise, default to dark mode
      this.setDark();
    }
  }
}

export { LightingManager };

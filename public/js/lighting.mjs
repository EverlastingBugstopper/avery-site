class LightingMode {
  constructor(toggleElement) {
    this.toggleElement = toggleElement;
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      this.setDark();
    } else {
      this.setLight();
    }
  }

  watch() {
    // TODO: watch for OS-level setting toggles
  }

  setDark() {
    window.document.body.classList.add("dark");
    window.document.body.classList.remove("light");
    this.toggleElement.setInnerHTML("☀️");
    this.mode = "dark";
  }

  setLight() {
    window.document.body.classList.add("light");
    window.document.body.classList.remove("dark");
    this.toggleElement.setInnerHTML("🌜");
    this.mode = "light";
  }

  isDark() {
    return this.mode === "dark";
  }

  isLight() {
    return this.mode === "light";
  }

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
    this.toggleElement.listenForClick(() => this.toggle());
  }
}

export { LightingMode };

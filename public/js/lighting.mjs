class LightingMode {
  constructor(toggleElement) {
    this.toggleElement = toggleElement;
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      this.setDark()
    } else {
      this.setLight()
    }
  }

  watch() {
    // TODO: watch for OS-level setting toggles
  }

  setDark() {
    window.document.body.classList.add("dark");
    window.document.body.classList.remove("light");
    this.toggleElement.setInnerHTML("🌙")
    this.mode = "dark";
  }

  setLight() {
    window.document.body.classList.add("light");
    window.document.body.classList.remove("dark");
    this.toggleElement.setInnerHTML("☀️")
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
      console.log("hey! who turned off the lights??")
      this.setDark();
    } else if (this.isDark()) {
      console.log("too bright too bright!!")
      this.setLight();
    } else {
      console.error("oops... not sure if we're in dark or light mode, sorry.");
    }
  }

  enable() {
    this.toggleElement.getHandle().addEventListener("click", () => {
      this.toggle()
    });
  }
}

export { LightingMode }
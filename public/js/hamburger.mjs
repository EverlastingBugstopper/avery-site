class HamburgerMenu {
  constructor([toggleElement, navElement]) {
    this.toggleElement = toggleElement;
    this.navElement = navElement;
  }

  isClosed() {
    return this.mode === "closed";
  }

  isOpen() {
    return this.mode === "open";
  }

  open() {
    this.navElement.addClass("open");
    this.navElement.removeClass("closed");
    this.mode = "open";
  }

  close() {
    console.log("closing");
    this.navElement.addClass("closed");
    this.navElement.removeClass("open");
    this.mode = "close";
  }

  toggle() {
    if (this.isClosed()) {
      this.open();
    } else if (this.isOpen()) {
      this.close();
    } else {
      this.open();
    }
  }

  enable() {
    this.toggleElement.listenForClick(() => this.toggle());
  }
}

export { HamburgerMenu };

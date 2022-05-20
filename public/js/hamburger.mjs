// currently this does nothing
// eventually it could become a real hamburger menu
// but I just don't have that much content right now
class HamburgerHelper {
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
    // this.toggleElement.enable();
    this.toggleElement.listenForClick(() => this.toggle());
  }
}

export { HamburgerHelper };

class Element {
  constructor(id) {
    this.id = id;
  }

  getHandle() {
    if (!this.handle) {
      this._handle = document.getElementById(this.id);
    }
    return this._handle;
  }

  listenForClick(onClick) {
    this.getHandle().addEventListener("click", onClick);
  }

  addClass(className) {
    this.getHandle().classList.add(className);
  }

  removeClass(className) {
    this.getHandle().classList.remove(className);
  }

  getInnerHTML() {
    return this.getHandle().innerHTML;
  }

  setInnerHTML(contents) {
    const handle = this.getHandle();
    handle.innerHTML = "";
    handle.innerHTML = contents;
  }
}

class ElementJar {
  constructor(elementIDs) {
    this.elements = {};
    for (const elementID of elementIDs) {
      this.elements[elementID] = new Element(elementID);
    }
  }

  scoop(elementIDs) {
    if (Array.isArray(elementIDs)) {
      let scoop = [];
      for (const elementID of elementIDs) {
        scoop.push(this.elements[elementID]);
      }
      return scoop;
    } else {
      return this.elements[elementIDs];
    }
  }
}

export { Element, ElementJar };

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
    this.elements = {}
    for (const elementID of elementIDs) {
      this.elements[elementID] = new Element(elementID);
    }
  }

  scoop(elementID) {
    return this.elements[elementID]
  }
}

export { Element, ElementJar };

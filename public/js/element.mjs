// oops. it's a handrolled mini framework,
// avert yer eyes.

class Element {
  // creates an element from an "id"
  constructor(id) {
    this.id = id;
  }

  // access the underlying DOM element
  // allowing us to query the DOM for these elements
  // exactly one time
  // is this overkill? maybe. i like it this way.
  _getDom() {
    if (!this.DOMHandle) {
      this.DOMHandle = document.getElementById(this.id);
    }
    if (!this.DOMHandle) {
      throw new Error(`Could not find an element with the ID '${this.id}'`);
    } else {
      return this.DOMHandle;
    }
  }

  // adds a click event handler to the element
  // this function must be passed a callback
  listenForClick(onClick) {
    return this._getDom().addEventListener("click", onClick);
  }

  // adds a class to the element
  addClass(className) {
    return this._getDom().classList.add(className);
  }

  // removes a class from an element
  removeClass(className) {
    return this._getDom().classList.remove(className);
  }

  // sets a KV attribute on an element
  setAttribute(name, value) {
    return this._getDom().setAttribute(name, value)
  }

  // sets the title attribute on an element
  setTitle(value) {
    return this.setAttribute("title", value);
  }

  // gets the current innerHTML of an element
  getInnerHTML() {
    return this._getDom().innerHTML;
  }

  // sets and returns the innerHTML of an element
  setInnerHTML(contents) {
    const handle = this._getDom();
    handle.innerHTML = "";
    handle.innerHTML = contents;
    return handle.innerHTML;
  }
}

class ElementJar {
  // creates an element jar from one or more elements
  // that can later be "scooped" by various functions
  constructor(elementIDs) {
    this.elements = {};
    for (const elementID of elementIDs) {
      this.elements[elementID] = new Element(elementID);
    }
  }

  // scoop one or more elements from the element jar
  // elementJar.scoop("my-element")
  // elementJar.scoop(["element-1", "element-2"])
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

// oops. it's a handrolled mini framework,
// avert yer eyes.
class Element {
  // creates an element from an "id" of a DOM element, or an existing handle to a DOM element
  constructor(init) {
    const { id, handle } = init;
    if (!id && !handle) {
      throw new Error(
        "You must provide either an 'id' or a 'handle' to create an element"
      );
    }
    this.handle = handle;
    this.id = id;
  }

  // access the underlying DOM element
  // allowing us to query the DOM for these elements
  // exactly one time
  // is this overkill? maybe. i like it this way.
  // it makes me feel efficient.
  _getDOMHandle() {
    // if we don't have a handle already...
    if (!this.handle) {
      // and we don't have an id
      if (!this.id) {
        // something went wrong
        throw new Error(
          "Something happened to this ID since this element instance was created..."
        );
      } else {
        // but! if we do have an id, we can ask the document for a handle very nicely
        const handle = document.getElementById(this.id);
        if (!handle) {
          // the document can say no of course. fine. let's complain
          this.handle = new Error(
            `Could not find element with id '${this.id}'`
          );
        } else {
          // otherwise let's remember the answer so we don't have to ask the document again
          this.handle = handle;
        }
      }
    }
    // if the handle wasn't set before, it should be now
    // is it an error?
    if (this.handle instanceof Error) {
      // if so, let's throw
      throw this.handle;
    } else {
      // otherwise let's return the handle
      return this.handle;
    }
  }

  // adds a click event handler to the element
  // this function must be passed a callback
  listenForClick(onClick) {
    return this._getDOMHandle().addEventListener("click", onClick);
  }

  // adds a handler to a media matcher
  // this function must be passed as a callback
  addListener(onMatch) {
    return this._getDOMHandle().addListener(onMatch);
  }

  // adds a class to the element
  addClass(className) {
    return this._getDOMHandle().classList.add(className);
  }

  // removes a class from an element
  removeClass(className) {
    return this._getDOMHandle().classList.remove(className);
  }

  // sets a KV attribute on an element
  setAttribute(name, value) {
    return this._getDOMHandle().setAttribute(name, value);
  }

  // sets the title attribute on an element
  setTitle(value) {
    return this.setAttribute("title", value);
  }

  // gets the current innerHTML of an element
  getInnerHTML() {
    return this._getDOMHandle().innerHTML;
  }

  // sets and returns the innerHTML of an element
  setInnerHTML(contents) {
    const handle = this._getDOMHandle();
    // first unset to clear (prevent webkit rendering bugs)
    handle.innerHTML = "";
    // then set to the contents
    handle.innerHTML = contents;
  }
}

class ElementJar {
  // creates an element jar from one or more elements
  // that can later be "scooped" by various functions
  constructor(elementInits) {
    this.elements = {};
    let conflictingIDs = [];
    for (let { id, DOMId, handle } of elementInits) {
      if (DOMId && !id) {
        id = DOMId;
      }
      if (!id && !DOMId) {
        throw new Error(
          "Each element must have an 'id' to refer to them later"
        );
      }
      if (this.elements[id]) {
        if (!conflictingIDs.includes(id)) {
          conflictingIDs.push(id);
        }
      } else {
        this.elements[id] = new Element({ id, handle });
      }
    }
    if (conflictingIDs.length > 0) {
      // is this... a shadow DOM?
      throw new Error(
        `Each ID in an element jar must be unique. The following IDs were defined multiple times: ${conflictingIDs.join(
          ", "
        )}`
      );
    }
  }

  // scoop one or more elements from the element jar
  // elementJar.scoop("my-element")
  // elementJar.scoop(["element-1", "element-2"])
  scoop(elementIDs) {
    let scoop = [];
    if (Array.isArray(elementIDs)) {
      for (const elementID of elementIDs) {
        scoop.push(this.elements[elementID]);
      }
    } else {
      scoop.push(this.elements[elementIDs]);
    }
    return scoop;
  }
}

export { Element, ElementJar };

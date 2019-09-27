class MegaMillionsElementHandler {
  constructor(lottoStrings) {
    this.lottoStrings = lottoStrings
  }

  element(element) {
    const id = element.getAttribute("id");
    const num = id.split("-")[1];
    element.setInnerContent(this.lottoStrings[num]);
  }
}

export { MegaMillionsElementHandler };

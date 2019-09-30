class MegaMillionsElementHandler {
  constructor(lottoStrings) {
    this.lottoStrings = lottoStrings;
  }

  element(element) {
    const id = element.getAttribute("id");
    const num = id.split("-")[1];
    element.setInnerContent(this.lottoStrings[num]);
  }
}

class CopyStringRewriter {
  constructor(lottoStrings) {
    this.lottoStrings = "";
    for (let i = 0; i < lottoStrings.length; i++) {
      this.lottoStrings += lottoStrings[i];
      if (i < lottoStrings.length - 1) {
        this.lottoStrings += " ";
      }
    }
  }

  element(element) {
    element.setInnerContent(this.lottoStrings);
  }
}

export { CopyStringRewriter, MegaMillionsElementHandler };

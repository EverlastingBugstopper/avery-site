// iterate through a bunch of emojis in order
class EmojiPresenter {
  // create an emoji presenter by passing one or more
  // Element instances, and optionally, the interval
  // in milliseconds before playing the next emoji
  constructor(
    emojiElements,
    interval = 600,
    emojis = ["😁", "🤔", "🤯", "🙄", "🤩", "😏", "😎", "😷", "🙃", "😐", "😌"]
  ) {
    if (Array.isArray(emojiElements)) {
      this.emojiStages = emojiElements;
    } else {
      this.emojiStages = [emojiElements];
    }
    this.interval = interval;
    this.emojis = emojis;
    this.emojI = 0;
  }

  // go to the next emoji, updating all of our stages
  next() {
    // setInterval takes a callback, so a callback is what it will get
    return () => {
      // find the emoji to display
      const emojiOnDeck = this.emojis[this.emojI];

      // iterate through each stage
      for (const emojiStage of this.emojiStages) {
        emojiStage.setInnerHTML(emojiOnDeck);
      }

      // if we ran out of emojis, go back to the beginning
      if (this.emojI == this.emojis.length - 1) {
        this.emojI = 0;
      } else {
        // otherwise, go to the next one
        this.emojI += 1;
      }
    };
  }

  // start the presentation
  enable() {
    setInterval(this.next(), this.interval);
  }
}

export { EmojiPresenter };

class EmojiSlideShow {
  constructor(emojiElement) {
    this.emojiOnStage = emojiElement;
    this.emojis = [
      "😁",
      "🤔",
      "🤯",
      "🙄",
      "🤩",
      "😏",
      "😎",
      "😷",
      "🙃",
      "😐",
      "😌",
    ];
    this.emojI = 0;
  }

  next() {
    return () => {
      const emojiOnDeck = this.emojis[this.emojI];
    console.log(`great job ${this.emojiOnStage.getInnerHTML()}, coming up to the stage next is ${emojiOnDeck}`)
    this.emojiOnStage.setInnerHTML(emojiOnDeck);
    if (this.emojI == this.emojis.length - 1) {
      this.emojI = 0;
    } else {
      this.emojI += 1;
    }
  }
  }

  party() {
    setInterval(this.next(), 600);
  }
}

export { EmojiSlideShow }
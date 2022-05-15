class EmojiSlideShow {
  constructor(emojiElement, interval = 600) {
    this.emojiOnStage = emojiElement;
    this.interval = interval;
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
      this.emojiOnStage.setInnerHTML(emojiOnDeck);
      if (this.emojI == this.emojis.length - 1) {
        this.emojI = 0;
      } else {
        this.emojI += 1;
      }
    };
  }

  enable() {
    setInterval(this.next(), this.interval);
  }
}

export { EmojiSlideShow };

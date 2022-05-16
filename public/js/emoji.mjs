class EmojiSlideShow {
  constructor(emojiElements, interval = 600) {
    if (Array.isArray(emojiElements)) {
      this.emojiStages = emojiElements;
    } else {
      this.emojiStages = [emojiElements];
    }
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
      for (const emojiStage of this.emojiStages) {
        emojiStage.setInnerHTML(emojiOnDeck);
      }
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

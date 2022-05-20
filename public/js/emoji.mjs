// iterate through a bunch of emojis in order
class EmojiPresenter {
  // create an emoji presenter by passing one or more
  // Element instances, and optionally, the interval
  // in milliseconds before playing the next emoji
  constructor(
    emojiElements,
    toggleElement,
    motionQueries,
    interval = 600,
    emojis = ["😁", "🤔", "🤯", "🙄", "🤩", "😏", "😎", "😷", "🙃", "😐", "😌"]
  ) {
    if (Array.isArray(emojiElements)) {
      this.emojiStages = emojiElements;
    } else {
      // if we only get one emoji, make it an array with a length of one
      this.emojiStages = [emojiElements];
    }
    this.toggleElement = toggleElement[0];
    this.reducedMotionQuery = motionQueries[0];
    this.noPreferenceQuery = motionQueries[1];
    this.interval = interval;
    this.emojis = emojis;

    // initialize presentation iterator
    this.emojI = 0;

    // disabled until we enable it
    this.mode = "disabled";

    // haven't registered the callback that starts the presentation
    this.cbRegistered = false;

    // haven't started watching for changes to media queries
    this.watching = false;
  }

  // if someone swithces their motion preference levels, we will detect
  watch() {
    if (!this.watching) {
      this.reducedMotionQuery.addListener((e) => e.matches && this.disable());
      this.noPreferenceQuery.addListener((e) => e.matches && this.enable());
      this.watching = true;
    }
  }

  // go to the next emoji, updating all of our stages
  next() {
    // setInterval takes a callback, so a callback is what it will get
    return () => {
      // if the presentation is disabled, don't do anything
      if (this.isEnabled()) {
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
      }
    };
  }

  // checks if the presentation is enabled
  isEnabled() {
    return this.mode === "enabled";
  }

  // checks if the presentation is disabled
  isDisabled() {
    return this.mode === "disabled";
  }

  // swap between enabled and disabled
  toggle() {
    if (this.isDisabled()) {
      this.enable();
    } else if (this.isEnabled()) {
      this.disable();
    } else {
      this.disable();
    }
  }

  // start the presentation
  enable() {
    // if the user does not want reduced motion, start the presentation
    if (this.isDisabled()) {
      this.mode = "enabled";
      if (!this.reducedMotionQuery.matches) {
        if (!this.cbRegistered) {
          setInterval(this.next(), this.interval);
          this.watch();
          this.toggleElement.enable();
          this.toggleElement.listenForClick(() => this.toggle());
          this.cbRegistered = true;
        }
      }
    }
  }

  disable() {
    if (this.isEnabled()) {
      this.mode = "disabled";
    }
  }
}

export { EmojiPresenter };

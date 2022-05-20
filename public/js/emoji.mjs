const MODE_KEY = "emoji-mode";

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

    // haven't registered the callback that starts the presentation
    this.cbRegistered = false;

    // haven't started watching for changes to media queries
    this.watching = false;
  }

  // if someone swithces their motion preference levels, we will detect
  watch() {
    if (!this.watching) {
      this.reducedMotionQuery.addListener((e) => e.matches && this.pause());
      this.noPreferenceQuery.addListener((e) => e.matches && this.play());
      this.watching = true;
    }
  }

  // go to the next emoji, updating all of our stages
  next() {
    // setInterval takes a callback, so a callback is what it will get
    return () => {
      // if the presentation is paused, don't do anything
      if (this.isPlaying()) {
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

  // checks if the presentation is playing
  isPlaying() {
    return this.mode === "playing";
  }

  // checks if the presentation is paused
  isPaused() {
    return this.mode === "paused";
  }

  play() {
    this.mode = "playing";
    if (localStorage) {
      localStorage.setItem(MODE_KEY, "playing");
    }
  }

  pause() {
    this.mode = "paused";
    if (localStorage) {
      localStorage.setItem(MODE_KEY, "paused");
    }
  }

  // swap between playing and paused
  toggle() {
    if (this.isPaused()) {
      this.play();
    } else if (this.isPlaying()) {
      this.pause();
    } else {
      this.pause();
    }
  }

  // start the presentation
  enable() {
    const userSettings = localStorage && localStorage.getItem(MODE_KEY);
    if (!userSettings) {
      if (this.reducedMotionQuery.matches) {
        this.pause();
      } else {
        this.play();
      }
    } else if (userSettings === "playing") {
      this.play();
    } else if (userSettings === "paused") {
      this.pause();
    } else {
      this.play();
    }
    if (!this.cbRegistered) {
      setInterval(this.next(), this.interval);
      this.watch();
      this.toggleElement.enable();
      this.toggleElement.listenForClick(() => this.toggle());
      this.cbRegistered = true;
    }
  }
}

export { EmojiPresenter };

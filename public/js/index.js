const emojis = ["😁","🤔","🙄","😔"]
let emojiIndex = 0;

let emojiHandle;

const getEmojiHandle = () => {
  if (!emojiHandle) {
    emojiHandle = document.getElementById("emoji")
  }
  return emojiHandle
}

setInterval(() => {
  const emojiHandle = getEmojiHandle()
  emojiHandle.innerHTML = emojis[emojiIndex];
  if (emojiIndex == emojis.length - 1){
    emojiIndex = 0
  } else {
    emojiIndex += 1
  }
},600)
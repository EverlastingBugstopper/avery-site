const ONE_SECOND = 1000;

let IMAGE_SOURCE = "/resources/img/clarktime/0/0.webp";
const imageTemplate = `<img alt="Clark Time" class="image" src="{{IMAGE_SOURCE}}"><div class="overlay" id="localtime"></div>`;

function updateDisplay(startDate, webp) {
  let currentMinute = startDate.getMinutes();
  setInterval(function() {
    let date = new Date();
    let newMinute = date.getMinutes();
    if (currentMinute < newMinute) {
      currentMinute = newMinute;
      updateImage(date.getHours(), newMinute, webp);
    }
    let display = date.toLocaleTimeString();
    document.getElementById("localtime").innerHTML = display;
  }, ONE_SECOND);
}

function updateImage(hour, minute, webp) {
  document.getElementById("clarktime").innerHTML = imageTemplate.replace(
    "{{IMAGE_SOURCE}}",
    `/resources/img/clarktime/${hour % 12}/${minute - 1}.${
      webp ? "webp" : "jpg"
    }`
  );
}

function supportsWebp() {
  var elem = document.createElement("canvas");

  if (!!(elem.getContext && elem.getContext("2d"))) {
    return elem.toDataURL("image/webp").indexOf("data:image/webp") == 0;
  }

  return false;
}

let webp = supportsWebp();
let date = new Date();
updateImage(date.getHours(), date.getMinutes(), webp);
updateDisplay(date, webp);

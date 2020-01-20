const ONE_SECOND = 1000;

let IMAGE_SOURCE = "/resources/img/clarktime/0/0.webp";
const imageTemplate = `<img id="clarktime" alt="Clark Datetime" class="image" src="{{IMAGE_SOURCE}}"><div class="overlay" id="localtime"></div>`;

function updateDisplay(startDate) {
  let currentMinute = startDate.getMinutes();
  setInterval(function() {
    let date = new Date();
    let newMinute = date.getMinutes();
    if (currentMinute < newMinute) {
      currentMinute = newMinute;
      updateImage(date.getHours(), newMinute);
    }
    let display = date.toLocaleTimeString();
    document.getElementById("localtime").innerHTML = display;
  }, ONE_SECOND);
}

function updateImage(hour, minute) {
  document.getElementById("clarktime").innerHTML = imageTemplate.replace(
    "{{IMAGE_SOURCE}}",
    `/resources/img/clarktime/${(hour % 12) - 1}/${minute - 1}.webp`
  );
}

let date = new Date();
updateImage(date.getHours(), date.getMinutes());
updateDisplay(date);

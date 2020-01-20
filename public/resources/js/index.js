function supportsWebp() {
  var elem = document.createElement("canvas");

  if (!!(elem.getContext && elem.getContext("2d"))) {
    return elem.toDataURL("image/webp").indexOf("data:image/webp") == 0;
  }

  return false;
}

if (!supportsWebp()) {
  var profilePic = document.getElementById("profile-pic");
  var src = profilePic.getAttribute("src");
  profilePic.setAttribute("src", src.replace("webp", "jpg"));
}

let memeDiv = document.getElementById("memeDisplay");
let meme = document.getElementById("selectedMeme");
let memeId = document.getElementById("memeId");

function createMeme(element) {
  meme.src = element.name;
  memeId.value = element.id;
}

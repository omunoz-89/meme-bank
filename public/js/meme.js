let memeDiv = document.getElementById('memeDisplay')
let meme = document.getElementById('selectedMeme')

function createMeme(element) {
    console.log('Created Meme')
    meme.src = element.id
}
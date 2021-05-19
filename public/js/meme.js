let memeDiv = document.getElementById('memeDisplay')
let meme = document.getElementById('selectedMeme')
let memeId = document.getElementById('memeId')
// let meme = document.querySelector('.selectedMeme')

function createMeme(element) {
    console.log('Created Meme')
    meme.src = element.name
    memeId.value = element.id
}
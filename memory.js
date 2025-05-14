const main_feed = document.querySelector(".main-feed")
const settings_wrap = document.querySelector(".settings_wrap")
const memory_wrap = document.querySelector(".memory_wrap")
const gameParameters = {
    name: '',
    difficulty: '',
    id: '',
    pairs_to_win: '',
    max_tries: '',
    images: []
}
/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function myFunction() {
    document.querySelector("#myDropdown").classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function (event) {
    if (!event.target.matches(".btn-difficulty")) {
        var dropdowns = document.querySelectorAll(".dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}

// Récuperer les paramètres en fonction de la difficulté
async function updateParameters(difficulty) {
    const old_info = settings_wrap.querySelector(".info_game")
    if (old_info) settings_wrap.removeChild(old_info)

    let api = ""
    if (difficulty === 0) api = "https://mocki.io/v1/8e5e6c35-8c52-4935-89cf-1dca5b18a02f"
    else if (difficulty === 1) api = "https://mocki.io/v1/ae626cf9-8588-4a45-9568-ef60240aa698"
    else if (difficulty === 2) api = "https://mocki.io/v1/8989c7ca-f24c-4db0-9861-ad65faa42032"

    const reponse = await fetch(api)
    data = await reponse.json()

    const info_game = document.createElement("div")
    info_game.classList.add("info_game")
    info_game.innerHTML = `
    <p><b>Jeu</b> : ${data.name}</p>
    <p><b>Difficulté</b> : ${data.difficulty}</p>
    <p><b>id</b> : ${data.id}</p>
    <p><b>Paires pour gagner</b> : ${data.pairs_to_win}</p>
    <p><b>Tentatives max</b>: ${data.max_tries}</p>`

    gameParameters.name = data.name
    gameParameters.difficulty = data.difficulty
    gameParameters.id = data.id
    gameParameters.pairs_to_win = data.pairs_to_win
    gameParameters.max_tries = data.max_tries
    gameParameters.images = data.images


    const btn_startGame = document.createElement("button")
    btn_startGame.classList.add("btn-startGame")
    btn_startGame.innerText = "Jouer"
    btn_startGame.addEventListener('click', () => {
        initGame()
    });

    info_game.appendChild(btn_startGame)
    settings_wrap.appendChild(info_game)

    //console.log(data)
    console.log(gameParameters)
}

// On attribue chaque difficulté à chaque bouton
const selector_easy = document.querySelector("#myDropdown_easy")
const selector_medium = document.querySelector("#myDropdown_medium")
const selector_hard = document.querySelector("#myDropdown_hard")

selector_easy.addEventListener('click', () => {
    updateParameters(0)
})

selector_medium.addEventListener('click', () => {
    updateParameters(1)
})

selector_hard.addEventListener('click', () => {
    updateParameters(2)
})

// MEMORY
let cards = []
let firstCard = null;
let secondCard = null;
let lockBoard = false;

// Mélange Fisher–Yates
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function initGame() {
    //console.log("START")

    // Mélange des cartes
    cards = shuffle([...gameParameters.images, ...gameParameters.images])
    console.log(cards)

    // Rendu plateau
    /*
    const cells = memory_wrap.querySelectorAll(".memory_cell")
    cells.forEach(function (cell) {
        const cell_img = document.createElement("img")
        cell_img.classList.add("back")
        cell_img.src = "images/memory/Memory_image_1_128x128.png"
        //console.log(cell_img)
        cell.addEventListener('click', () => {
            //console.log("Test")
            cell_img.classList.toggle("invisible")
        })
        cell.appendChild(cell_img)
    })
    */

    const board = document.querySelector('#memory-board');
    board.innerHTML = '';

    cards.forEach((val, index) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.value = val.url;
        card.dataset.index = index;

        // Remplissage 2 faces
        card.innerHTML = `<div class="front hidden"><img src="${card.dataset.value}"></img></div><div class="back"><img src="images/memory/Memory_back.png"></img></div>`;

        card.addEventListener('click', flipCard);
        board.appendChild(card);
    });
}

// Gestion du clic
function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flipped');
    this.querySelector('.front').classList.toggle("hidden")
    this.querySelector('.back').classList.toggle("hidden")

    if (!firstCard) {
        firstCard = this;
        return;
    }

    secondCard = this;
    lockBoard = true;
    checkForMatch();
}

// Vérification de la paire
function checkForMatch() {
    const isMatch = firstCard.dataset.value === secondCard.dataset.value;

    if (isMatch) {
        disableCards();
    } else {
        unflipCards();
    }
}

// Les cartes restent retournées
function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetBoard();
}

// Les cartes se retournent face cachée après un délai
function unflipCards() {
    setTimeout(() => {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        firstCard.querySelector('.front').classList.toggle("hidden")
        firstCard.querySelector('.back').classList.toggle("hidden")
        secondCard.querySelector('.front').classList.toggle("hidden")
        secondCard.querySelector('.back').classList.toggle("hidden")
        resetBoard();
    }, 1000);
}

// Réinitialisation des variables
function resetBoard() {
    [firstCard, secondCard] = [null, null];
    lockBoard = false;
}
const main_feed = document.querySelector(".main-feed")

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

// Fonction pour lancer une partie
async function showParameters(difficulty) {
    const old_info = main_feed.querySelector(".info_game")
    if (old_info) main_feed.removeChild(old_info)

    let api = ""
    if (difficulty === 0) api = "https://mocki.io/v1/14445d57-d5ff-40ef-97e7-6fddd6732b43"
    else if (difficulty === 1) api = "https://mocki.io/v1/efd56d56-f8fc-4fa3-bfd6-41604aecda4c"
    else if (difficulty === 2) api = "https://mocki.io/v1/4713d124-aedf-4001-84df-7db19c18f70a"

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

    main_feed.appendChild(info_game)
    //console.log(data)
}

// On attribue chaque difficulté à chaque bouton
const selector_easy = document.querySelector("#myDropdown_easy")
const selector_medium = document.querySelector("#myDropdown_medium")
const selector_hard = document.querySelector("#myDropdown_hard")

selector_easy.addEventListener('click', () => {
    showParameters(parseInt(0))
})

selector_medium.addEventListener('click', () => {
    showParameters(parseInt(1))
})

selector_hard.addEventListener('click', () => {
    showParameters(parseInt(2))
})
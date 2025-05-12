const btnRefresh = document.querySelector("#btn-refresh")
const btnFeed = document.querySelector("#btn-generate-feed")
const pokedexLogo = document.querySelector(".pokemon-logo")

const pokemonTeam = document.querySelector(".pokemon-team__preview")
const pokemonTeamCell = pokemonTeam.querySelectorAll(".pokemon-team__preview_cell")

let dropDownActive = false;
const myTeam = []
let myFeed = []

function getRdmPokemonID() {
    return Math.floor(Math.random() * 898) + 1
}

// fonction qui génère 1 pokemon aléatoire en haut de la page
async function randomPokemon() {

    const id = getRdmPokemonID()

    const randomPokemonElement = document.querySelector(".random-pokemon")
    const randomPokemonImage = randomPokemonElement.querySelector("img")
    const randomPokemonName = randomPokemonElement.querySelector(".pokemon-name")

    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        .then(response => response.json())
        .then(pokemon => {
            console.log(pokemon.name)

            // Bloc RANDOM
            //randomPokemonImage.src = pokemon.sprites.front_default
            randomPokemonImage.src = pokemon.sprites.other["official-artwork"].front_default
        
            randomPokemonName.innerHTML = pokemon.name
        })
        .catch(err => {
            console.error(err)

            randomPokemonName.innerHTML = "erreur"
        })
}

function updateMyTeam() {
    pokemonTeamCell.forEach(function (object) {
        object.innerHTML = ""
    })


    for (let pos in myTeam) {
        //console.log(pokemonTeamCell[pos])
        pokemonTeamCell[pos].innerHTML = myTeam[pos].PokemonID

        const pokemonMinia = document.createElement("img")
        pokemonMinia.src = myTeam[pos].PokemonImage

        pokemonTeamCell[pos].appendChild(pokemonMinia)

    }
}

async function addToMyTeam(id) {
    if (myTeam.length < 6) {
        const reponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        pokemon = await reponse.json()

        const pokemonName = pokemon.name
        const pokemonImage = pokemon.sprites.other["official-artwork"].front_default

        const newPokemon = {
            PokemonID: id,
            PokemonName: pokemonName,
            PokemonImage: pokemonImage
        }

        myTeam.push(newPokemon)
        console.log(myTeam)
        updateMyTeam()
    }
}

function removeFromMyTeam() {
    let id = this.innerText
    console.log(id)
    let pos = myTeam.findIndex( pokemon => pokemon.PokemonID === parseInt(id) )
    console.log(pos)
    myTeam.splice(pos,1)
    //console.log(myTeam)
    updateMyTeam()
}

// fonction qui ajoute 1 pokemon (aléatoire) au feed
async function addPokemon() {
    const pokemonFeed = document.querySelector(".pokemon-list")

    const id = getRdmPokemonID()
    const reponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    pokemon = await reponse.json()

    // Bloc général
    const pokemonDetails = document.createElement("div")
    pokemonDetails.classList.add("pokemon-details")

    // Name
    const pokemonName = document.createElement("div")
    pokemonName.classList.add("pokemon-name")
    pokemonName.innerHTML = pokemon.name

    // Image
    const pokemonImage = document.createElement("div")
    pokemonImage.classList.add("pokemon-image")
    const pokemonImageImg = document.createElement("img")
    //pokemonImageImg.src = pokemon.sprites.front_default
    pokemonImageImg.src = pokemon.sprites.other["official-artwork"].front_default

    // Infos
    const pokemonInfos = document.createElement("div")
    pokemonInfos.classList.add("pokemon-infos")

    pokemonDetails.appendChild(pokemonName)
    pokemonDetails.appendChild(pokemonImage)
    pokemonImage.appendChild(pokemonImageImg)
    pokemonDetails.appendChild(pokemonInfos)

    pokemonFeed.appendChild(pokemonDetails)

    pokemonDetails.addEventListener("click", () => addToMyTeam(id))
}

function feedPokemon() {
    const pokemonFeed = document.querySelector(".pokemon-list")

    let pokemonFeedObjects = pokemonFeed.querySelectorAll(".pokemon-details");
    pokemonFeedObjects.forEach(function (object) {
        pokemonFeed.removeChild(object)
    });

    feedNbToCreate = document.querySelector("#feed-gen-nb").value
    for (let i = 0; i < feedNbToCreate; i++) {
        addPokemon()
    }

    /*
    pokemonFeedObjects = pokemonFeed.querySelectorAll(".pokemon-details");
    pokemonFeedObjects.forEach(function (object) {
        object.addEventListener("click", addToMyTeam)
    });
    */

}

function dropDownMenu() {
    const pokedexLogoList = pokedexLogo.querySelector("ul")
    pokedexLogoList.classList.toggle("hidden")
}

// Appel AJAX au chargement de la page
window.addEventListener('DOMContentLoaded', randomPokemon)

// Re-appel ajax quand clic bouton
btnRefresh.addEventListener("click", randomPokemon)
btnFeed.addEventListener("click", feedPokemon)

pokedexLogo.addEventListener("click", dropDownMenu)


// Ajout de l'event remove from my team sur un clic sur une case
pokemonTeamCell.forEach(function (object) {
    object.addEventListener("click", removeFromMyTeam)
})

const btnRefresh = document.querySelector("#btn-refresh")
const btnFeed = document.querySelector("#btn-generate-feed")
const pokedexLogo = document.querySelector(".pokemon-logo")

const pokemonList = document.querySelector(".pokemon-list")

const pokemonTeam = document.querySelector(".pokemon-team__preview")
const pokemonTeamCell = pokemonTeam.querySelectorAll(".pokemon-team__preview_cell")

let dropDownActive = false;
const myTeam = []
let myFeed = []

function getRdmPokemonID() {
    return Math.floor(Math.random() * 898) + 1
}

// Fonction qui met la première lettre en majuscule 
function capitalizeFirstLetter(str) {
    if (!str) return "";
    return str[0].toUpperCase() + str.slice(1);
}

// fonction qui génère 1 pokemon aléatoire en haut de la page
async function randomPokemon() {

    const id = getRdmPokemonID()

    const randomPokemonElement = document.querySelector(".random-pokemon")
    const randomPokemonImage = randomPokemonElement.querySelector("img")
    const randomPokemonName = randomPokemonElement.querySelector(".pokemon-name")


    const [reponse, reponseFR] = await Promise.all([
        fetch(`https://pokeapi.co/api/v2/pokemon/${id}`),
        fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`)
    ]);
    
    const [pokemon, pokemonFR] = await Promise.all([
        reponse.json(),
        reponseFR.json()
    ]);

    console.log(pokemon.name)

    // Bloc RANDOM
    //randomPokemonImage.src = pokemon.sprites.front_default
    randomPokemonImage.src = pokemon.sprites.other["official-artwork"].front_default
    randomPokemonName.innerHTML = pokemonFR.names.find(n => n.language.name === "fr")?.name;

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
        const index = myFeed.findIndex( pokemon => pokemon.PokemonID === parseInt(id))
        myTeam.push(myFeed[index])
        //console.log(myTeam)
        updateMyTeam()
    }
}

function removeFromMyTeam() {
    let id = this.innerText
    //console.log(id)
    let pos = myTeam.findIndex( pokemon => pokemon.PokemonID === parseInt(id) )
    //console.log(pos)
    myTeam.splice(pos,1)
    //console.log(myTeam)
    updateMyTeam()
}

// fonction qui ajoute 1 pokemon (aléatoire) au feed
async function addPokemon() {
    const pokemonFeed = document.querySelector(".pokemon-list")

    const id = getRdmPokemonID()
    const [reponse, reponseFR] = await Promise.all([
        fetch(`https://pokeapi.co/api/v2/pokemon/${id}`),
        fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`)
    ]);
    
    const [pokemon, pokemonFR] = await Promise.all([
        reponse.json(),
        reponseFR.json()
    ]);

    const nameFR = pokemonFR.names.find(n => n.language.name === "fr")?.name;
    const flavorFR = pokemonFR.flavor_text_entries.find(entry => entry.language.name === "fr")?.flavor_text;
    const cleanTextFR = flavorFR?.replace(/\f/g, ' ').replace(/\n/g, ' ');
    
    const newPokemon = {
        PokemonID: id,
        PokemonName: capitalizeFirstLetter(pokemon.name),
        PokemonNameFR: nameFR,
        PokemonImage: pokemon.sprites.other["official-artwork"].front_default,
        PokemonDescriptif: cleanTextFR,
        PokemonTaille: pokemon.height,
        PokemonPoids: pokemon.weight,
        PokemonType: capitalizeFirstLetter(pokemon.types[0].type.name),
        PokemonTalent: capitalizeFirstLetter(pokemon.abilities[0].ability.name)
    }

    //console.log(nameFR, cleanTextFR)

    // Bloc général
    const pokemonDetails = document.createElement("div")
    pokemonDetails.classList.add("pokemon-details", "pokemon-details--grid")

    // Main frame
    const pokemonMainFrame = document.createElement("div")
    pokemonMainFrame.classList.add("pokemon-mainframe")

    // Name
    const pokemonName = document.createElement("div")
    pokemonName.classList.add("pokemon-name")
    pokemonName.innerHTML = nameFR

    // Image
    const pokemonImage = document.createElement("div")
    pokemonImage.classList.add("pokemon-image")
    const pokemonImageImg = document.createElement("img")
    //pokemonImageImg.src = pokemon.sprites.front_default
    pokemonImageImg.src = pokemon.sprites.other["official-artwork"].front_default

    // Infos
    const pokemonInfos = document.createElement("div")
    pokemonInfos.classList.add("pokemon-infos", "hidden")

    // Infos - NameFR
    const pokemonInfosNameFRA = document.createElement("div")
    pokemonInfosNameFRA.classList.add("pokemon-infos__nameFRA")
    pokemonInfosNameFRA.innerHTML = `<b>Nom (FR)</b> : ${newPokemon.PokemonNameFR}`
    pokemonInfos.appendChild(pokemonInfosNameFRA)

    // Infos - NameENG
    const pokemonInfosNameENG = document.createElement("div")
    pokemonInfosNameENG.classList.add("pokemon-infos__nameENG")
    pokemonInfosNameENG.innerHTML = `<b>Nom (EN)</b> : ${newPokemon.PokemonName}`
    pokemonInfos.appendChild(pokemonInfosNameENG)

    // Infos - Descriptif
    const pokemonInfosDescription = document.createElement("div")
    pokemonInfosDescription.classList.add("pokemon-infos__description")
    pokemonInfosDescription.innerHTML = `<b>Descriptif</b> : ${newPokemon.PokemonDescriptif}`
    pokemonInfos.appendChild(pokemonInfosDescription)

    // Infos - Taille
    const pokemonInfosHeight = document.createElement("div")
    pokemonInfosHeight.classList.add("pokemon-infos__height")
    pokemonInfosHeight.innerHTML = `<b>Taille</b> : ${(newPokemon.PokemonTaille/10)}m`
    pokemonInfos.appendChild(pokemonInfosHeight)  

    // Infos - Poids
    const pokemonInfosWeight = document.createElement("div")
    pokemonInfosWeight.classList.add("pokemon-infos__weight")
    pokemonInfosWeight.innerHTML = `<b>Poids</b> : ${(newPokemon.PokemonPoids/10)}kg`
    pokemonInfos.appendChild(pokemonInfosWeight)   

    // Infos - Type
    const pokemonInfosType = document.createElement("div")
    pokemonInfosType.classList.add("pokemon-infos__type")
    pokemonInfosType.innerHTML = `<b>Type</b> : ${newPokemon.PokemonType}`
    pokemonInfos.appendChild(pokemonInfosType)   

    // Infos - Talent
    const pokemonInfosTalent = document.createElement("div")
    pokemonInfosTalent.classList.add("pokemon-infos__talent")
    pokemonInfosTalent.innerHTML = `<b>Talent</b> : ${newPokemon.PokemonTalent}`
    pokemonInfos.appendChild(pokemonInfosTalent)   

    pokemonMainFrame.appendChild(pokemonName)
    pokemonMainFrame.appendChild(pokemonImage)
    pokemonDetails.appendChild(pokemonMainFrame)
    pokemonImage.appendChild(pokemonImageImg)
    pokemonDetails.appendChild(pokemonInfos)

    pokemonFeed.appendChild(pokemonDetails)

    pokemonDetails.addEventListener("click", () => addToMyTeam(id))

    myFeed.push(newPokemon)
}

function feedPokemon() {
    const pokemonFeed = document.querySelector(".pokemon-list")

    myFeed = []
    let pokemonFeedObjects = pokemonFeed.querySelectorAll(".pokemon-details");
    pokemonFeedObjects.forEach(function (object) {
        pokemonFeed.removeChild(object)
    });

    feedNbToCreate = document.querySelector("#feed-gen-nb").value
    for (let i = 0; i < feedNbToCreate; i++) {
        addPokemon()
    }

    console.log(myFeed)
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

// Ajout des events de layout sur les boutons
const btnLayoutGrid = document.querySelector("#btn-layout-grid")
btnLayoutGrid.addEventListener("click", () => {
    pokemonList.classList.add("pokemon-list--grid"); 
    pokemonList.classList.remove("pokemon-list--list"); 
    const info_list = pokemonList.querySelectorAll(".pokemon-details .pokemon-infos")
    info_list.forEach(function (object) {
        object.classList.add("hidden")
    })

    const detail_list = pokemonList.querySelectorAll(".pokemon-details")
    detail_list.forEach(function (object) {
        object.classList.remove("pokemon-details--list")
        object.classList.add("pokemon-details--grid")
    })
})

const btnLayoutList = document.querySelector("#btn-layout-list")
btnLayoutList.addEventListener("click", () => {
    pokemonList.classList.add("pokemon-list--list"); 
    pokemonList.classList.remove("pokemon-list--grid"); 
    const info_list = pokemonList.querySelectorAll(".pokemon-details .pokemon-infos")
    info_list.forEach(function (object) {
        object.classList.remove("hidden")
    })
    
    const detail_list = pokemonList.querySelectorAll(".pokemon-details")
    detail_list.forEach(function (object) {
        object.classList.remove("pokemon-details--grid")
        object.classList.add("pokemon-details--list")
    })
    
})
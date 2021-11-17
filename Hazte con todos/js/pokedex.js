//https://pokeapi.co/api/v2/pokemon/

// Set number of pokémon desired
const pkmnQuantity = 150

// Fetch the pokemon
async function fetchPokemon(number){
    let results = []
    for (i = 1; i <= number; i++) {
        let response = await fetch("https://pokeapi.co/api/v2/pokemon/" + i)
        .then( (response) => {
            return response.json()
            }
        )
        results.push(response)
    }
    
    const pokemon = results.map((result) => ({
        name: result.name,
        image: result.sprites['front_default'],
        type: result.types.map((type) => type.type.name).join(', '),
        id: result.id
    }))

    console.log(pokemon)

    return pokemon
}

async function displayPokemon(qty) {
    const pokemons = await fetchPokemon(qty)
    let list = document.getElementById("pokedex")
    for (let pokemon of pokemons) {

        let card = document.createElement('li')
        card.className = "card"
        
        let title = document.createElement('h1')
        title.innerHTML = pokemon.name
        title.className = "card-title"
        
        let subtitle = document.createElement('h2')
        subtitle.innerHTML = pokemon.type
        subtitle.className = "card-subtitle"
        
        let id = document.createElement('p')
        id.innerHTML = pokemon.id
        id.className = "card-subtitle"
        
        let picture = document.createElement('img')
        picture.src = pokemon.image
        picture.className = "card-image"

        card.appendChild(id)
        card.appendChild(picture)
        card.appendChild(title)
        card.appendChild(subtitle)
        
        list.appendChild(card)
    }
    

}

displayPokemon(pkmnQuantity)
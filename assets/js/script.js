let main = document.getElementById("main");

//Descripción: Función que obtiene los datos de la API y devuelve un parámetro con los resultados
//Entrada: Ninguna
//Salida: Un arreglo con los resultados de la API
const pokemones = async () => {
    try {
        const URL = "https://pokeapi.co/api/v2/pokemon/";
        const response = await fetch(URL);
        const data = await response.json();
        return data.results;
    } catch (error) {
        console.log(error);
    }
};

//Descripción: Función que obtiene los datos de la API y devuelve los datos
//Entrada: URL de la API
//Salida: Un arreglo con los datos de la API
const infoPokemon = async (URL) => {
    try{
        const response = await fetch(URL);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
};

//Descripción: Función que convierte la primera letra de una cadena en mayúscula
//Entrada: Una cadena
//Salida: La cadena con la primera letra en mayúscula
function primeraLetraMayus(str) {
    return str.charAt(0).toUpperCase()+str.slice(1);
}

//Descripción: Función que devuelve el color de fondo de la tarjeta según el tipo de pokémon
//Entrada: El nombre del tipo de pokémon
//Salida: El color de fondo de la tarjeta
const typeColor = (name) => {
    switch (name) {
        case "grass":
            return "#A7DB8D";
        case "fire":
            return "#F5AC78";
        case "water":
            return "#9DB7F5";
        case "bug":
            return "#C6D16E";
        case "flying":
            return "#C6B7F5";
        case "normal":
            return "#C6C6A7";
        default:
            break;
    }
};

//Descripción: Función que crea las tarjetas de los pokémon y además las funciones de voltear la tarjeta
//Entrada: Ninguna
//Salida: Ninguna
const pkmnCards = (async () => {
    const data = await pokemones();
    for (let i = 0; i < 20; i++) {
        const dataPokemones = await infoPokemon(data[i].url);
        main.innerHTML += 
        `<div class="card">
            <div class="card-inner">
                <div class="card-front">
                    <div class="card-body">
                        <img style="background-color:${typeColor(dataPokemones.types[0].type.name)}" src="${dataPokemones.sprites.other.dream_world.front_default}"alt="">
                    </div>
                </div>
                <div class="card-back">
                    <div class="card-body">
                        <h1 class="card-title">${primeraLetraMayus(data[i].name)}</h1>
                        <p class="card-text">Type: ${primeraLetraMayus(dataPokemones.types[0].type.name)}</p>
                        <p class="card-text">Height: ${dataPokemones.height}</p>
                        <p class="card-text">Weight: ${dataPokemones.weight}</p>
                    </div>
                </div>
            </div>
        </div>`;
    }
    const cards = document.querySelectorAll('.card');

    //Descripción: Función que agrega la clase flipping a la tarjeta y la clase flipped a la tarjeta que se le da click
    //Entrada: Ninguna
    //Salida: Ninguna
    cards.forEach(function (card) {
        card.addEventListener('click', function () {
            card.classList.add('flipping');
            card.classList.toggle('flipped');
        });
        card.addEventListener('transitionend', function () {
            card.classList.remove('flipping');
        });
    });
    
})();
    


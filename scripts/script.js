async function getPokemonInfo(pokemon) {
  try {
    const response = await axios.get(pokemon.url);
    const pokeObj = {
      name: response.data.name,
      image: response.data.sprites.front_default,
      abilities: response.data.abilities
        .map((abilityInfo) => abilityInfo.ability.name)
        .join(", "),
      types: response.data.types
        .map((typeInfo) => typeInfo.type.name)
        .join(", "),
    };

    displayPokemon(pokeObj);
  } catch (error) {
    console.error("Error: ", error);
  }
}

async function getAllPokemons() {
  try {
    const response = await axios.get(
      "https://pokeapi.co/api/v2/pokemon?limit=20"
    );

    const pokemons = response.data.results;

    pokemons.forEach((pokemon) => {
      getPokemonInfo(pokemon);
    });
  } catch (error) {
    console.error("Error: ", error);
  }
}

function displayPokemon(pokeObj) {
  const pokemonList = document.querySelector(".pokemons");

  const cardElement = document.createElement("article");
  cardElement.classList.add("card");

  const imageWrapperElement = document.createElement("div");
  imageWrapperElement.classList.add("card__image-wrapper");

  const imgElement = document.createElement("img");
  imgElement.classList.add("card__image");
  imgElement.src = pokeObj.image;
  imgElement.alt = pokeObj.name;
  imageWrapperElement.appendChild(imgElement);

  const cardBodyElement = document.createElement("div");
  cardBodyElement.classList.add("card__body");

  const nameElement = document.createElement("h3");
  nameElement.classList.add("card__title");
  nameElement.textContent = pokeObj.name.toUpperCase();

  const typeElement = document.createElement("p");
  typeElement.textContent = `Types: ${pokeObj.types}`;

  const abilityElement = document.createElement("p");
  abilityElement.textContent = `Abilities: ${pokeObj.abilities}`;

  cardElement.appendChild(imageWrapperElement);
  cardElement.appendChild(nameElement);
  cardElement.appendChild(typeElement);
  cardElement.appendChild(abilityElement);

  pokemonList.appendChild(cardElement);
}

getAllPokemons();

const battleForm = document.getElementById("pokemonBattleForm");

battleForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const resultElement = document.querySelector(".result");
  const winnerPara = document.querySelector(".winner");
  const playerOneScore = 20;
  const playerTwoScore = 12;
  //make value lower case

  if (playerOneScore > playerTwoScore) {
    winnerPara.textContent = `${event.target.pokemonOne.value} is the winner.`;
    //highlight bulbasaur container with border
  } else if (playerOneScore < playerTwoScore) {
    winnerPara.textContent = `${event.target.pokemonTwo.value} is the winner.`;
    //highlight pikachu container with border
  } else {
    winnerPara.textContent = `Oops! It's a tie.`;
  }

  resultElement.classList.remove("hide");
  resultElement.classList.add("show");
});

// function populatePokeImages() {
//   const pokemonImagesContainer = document.querySelector(".poke-images");

//   const divElement = document.createElement("div");
//   divElement.classList.add("image-option");

//   const inputElement = document.createElement("input");
//   inputElement.classList.add("radio");
//   inputElement.type = "radio";
//   inputElement.name = "playerOnePokemon";
//   inputElement.value = "pikachu";
//   inputElement.id = "pikachu1";

//   const labelElement = document.createElement("label");
//   labelElement.setAttribute("for", "pikachu");

//   const imgElement = document.createElement("img");
//   imgElement.src = "./assets/images/pikachu.png";
//   imgElement.alt = "pikachu";
//   imgElement.classList.add("radio-image");

//   labelElement.appendChild(imgElement);

//   divElement.appendChild(inputElement);
//   divElement.appendChild(labelElement);

//   pokemonImagesContainer.appendChild(divElement);
// }

// populatePokeImages();

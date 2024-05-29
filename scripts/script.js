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
  const pokemonList = document.querySelector(".pokemon-list");

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
  const winnerElement = document.querySelector(".result__winner");
  const playerOne = event.target.playerOne.value;
  const playerTwo = event.target.playerTwo.value;
  const playerOnePokemon = event.target.playerOnePokemon.value;
  const playerTwoPokemon = event.target.playerTwoPokemon.value;

  console.log(playerOnePokemon);
  console.log(playerTwoPokemon);

  let p1Stats = JSON.parse(playerOnePokemon);
  let p2Stats = JSON.parse(playerTwoPokemon);

  let i = 0;
  while (p1Stats.hp > 0 && p2Stats.hp > 0) {
    if (i > 1000) {
      console.log("tie");
      p1Stats.hp = p2Stats.hp;
      break;
    } else {
      if (p1Stats.speed > p2Stats.speed) {
        hpLost = p2Stats.defense - p1Stats.attack;
        if (hpLost < 0) {
          p2Stats.hp = p2Stats.hp + hpLost;
        }
        if (p1Stats.speed > 0) {
          p1Stats.speed = p1Stats.speed - 30;
        }
      } else if (p1Stats.speed < p2Stats.speed) {
        hpLost = p1Stats.defense - p2Stats.attack;
        if (hpLost < 0) {
          p1Stats.hp = p1Stats.hp + hpLost;
        }
        if (p2Stats.speed > 0) {
          p2Stats.speed = p2Stats.speed - 30;
        }
      } else {
        console.log("tie");
        p1Stats.hp = p2Stats.hp;
        break;
      }
    }
    console.log(p1Stats);
    console.log(p2Stats);
    i++;
  }

  const playerOneScore = p1Stats.hp;
  const playerTwoScore = p2Stats.hp;

  if (playerOneScore > playerTwoScore) {
    winnerElement.textContent = `🏅 ${
      playerOne.charAt(0).toUpperCase() + playerOne.slice(1)
    } 🏅`;
  } else if (playerOneScore < playerTwoScore) {
    winnerElement.textContent = `🏅 ${
      playerTwo.charAt(0).toUpperCase() + playerTwo.slice(1)
    } 🏅`;
  } else {
    winnerElement.textContent = `Oops! It's a tie.`;
  }

  resultElement.classList.remove("result--hide");
  resultElement.classList.add("result--show");

  battleForm.reset();
});

const playerOnePokemon = document.getElementById("playerOnePokemon");
const playerTwoPokemon = document.getElementById("playerTwoPokemon");

const choicesContOne = document.createElement("div");
choicesContOne.classList.add("choices-container");
const choicesContTwo = document.createElement("div");
choicesContTwo.classList.add("choices-container");

const populateFormOneRadio = (pokemonObj) => {
  const labelEl = document.createElement("label");
  labelEl.classList.add("pokemon");

  const inputRadio = document.createElement("input");

  const statsObj = {
    hp: pokemonObj.stats[0].base_stat,
    attack: pokemonObj.stats[1].base_stat,
    defense: pokemonObj.stats[2].base_stat,
    speed: pokemonObj.stats[5].base_stat,
  };

  inputRadio.type = "radio";
  inputRadio.id = pokemonObj.id;
  inputRadio.name = "playerOnePokemon";
  inputRadio.value = JSON.stringify(statsObj);
  inputRadio.classList.add("pokemon__radio");

  const name = document.createElement("h3");
  name.textContent = pokemonObj.name;

  const imgEL = document.createElement("img");
  imgEL.classList.add("pokemon__image");
  imgEL.src = pokemonObj.sprites.front_default;
  imgEL.alt = pokemonObj.name;

  const paraEL = document.createElement("p");
  paraEL.classList.add("pokemon__name");
  paraEL.textContent = pokemonObj.name;

  labelEl.appendChild(inputRadio);
  labelEl.appendChild(imgEL);
  labelEl.appendChild(paraEL);
  choicesContOne.appendChild(labelEl);
};

const populateFormTwoRadio = (pokemonObj) => {
  const labelEl = document.createElement("label");
  labelEl.classList.add("pokemon-wrapper");

  const inputRadio = document.createElement("input");

  const statsObj = {
    hp: pokemonObj.stats[0].base_stat,
    attack: pokemonObj.stats[1].base_stat,
    defense: pokemonObj.stats[2].base_stat,
    speed: pokemonObj.stats[5].base_stat,
  };

  inputRadio.type = "radio";
  inputRadio.id = pokemonObj.id;
  inputRadio.name = "playerTwoPokemon";
  inputRadio.value = JSON.stringify(statsObj);
  inputRadio.classList.add("pokemon__radio");

  const name = document.createElement("h3");
  name.textContent = pokemonObj.name;

  const imgEL = document.createElement("img");
  imgEL.classList.add("pokemon__image");
  imgEL.src = pokemonObj.sprites.front_default;
  imgEL.alt = pokemonObj.name;

  const paraEL = document.createElement("p");
  paraEL.classList.add("pokemon__name");
  paraEL.textContent = pokemonObj.name;

  labelEl.appendChild(inputRadio);
  labelEl.appendChild(imgEL);
  labelEl.appendChild(paraEL);

  choicesContTwo.appendChild(labelEl);
};

playerOnePokemon.appendChild(choicesContOne);
playerTwoPokemon.appendChild(choicesContTwo);

const getPokemon = async () => {
  try {
    let numChoices = 10;
    let results = [];
    for (let i = 0; i < numChoices; i++) {
      // can use a promise
      results[i] = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${
          Math.floor(Math.random() * 200) + 1
        }`
      );

      populateFormOneRadio(results[i].data);
      populateFormTwoRadio(results[i].data);
    }
  } catch (error) {
    console.error(error);
  }
};

getPokemon();

class Pokemon {
  constructor() {
    this.baseUrl = "https://pokeapi.co/api/v2/";
  }

  async getPokemon() {
    try {
      let numChoices = 10;
      let body = document.querySelector("body");
      let results = [];
      for (let i = 0; i < numChoices; i++) {
        results[i] = await axios.get(
          `${this.baseUrl}pokemon/${Math.floor(Math.random() * 200) + 1}`
        );
        let pokemonCont = document.createElement("h2");
        pokemonCont.textContent = results[i].data.name;
        body.appendChild(pokemonCont);
      }

      console.log(results);
      // return results;
    } catch (error) {
      console.error(error);
    }
  }
}

const pokemon = new Pokemon();
let numChoices = 10;

console.log(pokemon.getPokemon());

// async function getPokemon() {
//   try {
//     let pokemon1 = await axios.get(
//       `${baseUrl}pokemon/${Math.floor(Math.random() * 200) + 1}`
//     );
//     let pokemon2 = await axios.get(
//       `${baseUrl}pokemon/${Math.floor(Math.random() * 200) + 1}`
//     );

//     const body = document.querySelector("body");
//     const pokemon1Elem = document.createElement("article");
//     const pokemon2Elem = document.createElement("article");
//     const pokemon1Name = document.createElement("h2");
//     const pokemon2Name = document.createElement("h2");
//     const pokemon1Hp = document.createElement("p");
//     const pokemon2Hp = document.createElement("p");
//     const pokemon1Attack = document.createElement("p");
//     const pokemon2Attack = document.createElement("p");
//     const pokemon1Defense = document.createElement("p");
//     const pokemon2Defense = document.createElement("p");

//     pokemon1Name.textContent = pokemon1.data.name;
//     pokemon1Hp.textContent = "HP: " + pokemon1.data.stats[0].base_stat;
//     pokemon1Attack.textContent = "Attack: " + pokemon1.data.stats[1].base_stat;
//     pokemon1Defense.textContent =
//       "Defense: " + pokemon1.data.stats[2].base_stat;
//     pokemon2Name.textContent = pokemon2.data.name;
//     pokemon2Hp.textContent = "HP: " + pokemon2.data.stats[0];
//     pokemon1Attack.textContent = pokemon1.data.stats[1].base_stat;
//     pokemon1Defense.textContent = pokemon1.data.stats[2].base_stat;

//     pokemon1Elem.appendChild(pokemon1Name);
//     pokemon1Elem.appendChild(pokemon1Hp);
//     pokemon1Elem.appendChild(pokemon1Attack);
//     pokemon1Elem.appendChild(pokemon1Defense);

//     pokemon2Elem.appendChild(pokemon2Name);

//     body.appendChild(pokemon1Elem);
//     body.appendChild(pokemon2Elem);

//     // getResponse(response.data);
//   } catch (error) {
//     console.error(error);
//   }
// }

// console.log(getPokemon());
// let pokemon2 = await getPokemon();

// const getResponse = (pokemon) => {
//   return pokemon;
// };
// console.log(pokemon1);

// let pokemon1 = await getPokemon();
// console.log(pokemon1);

// getPokemon();
// getPokemon();

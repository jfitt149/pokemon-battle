class Pokemon {
  constructor() {
    this.baseUrl = "https://pokeapi.co/api/v2/";
  }

  async getPokemon() {
    try {
      let numChoices = 10;
      let results = [];
      let form = document.querySelector("form");
      let choicesCont = document.createElement("div");
      choicesCont.classList.add("choices-container");
      for (let i = 0; i < numChoices; i++) {
        results[i] = await axios.get(
          `${this.baseUrl}pokemon/${Math.floor(Math.random() * 200) + 1}`
        );

        let label = document.createElement("label");
        let inputRadio = document.createElement("input");
        let labelImg = document.createElement("img");
        let name = document.createElement("h3");
        let stats = document.createElement("p");

        inputRadio.type = "radio";
        inputRadio.value = results[i].data.name;
        inputRadio.id = results[i].data.id;

        name.textContent = results[i].data.name;
        const statsObj = {
          hp: results[i].data.stats[0].base_stat,
          attack: results[i].data.stats[1].base_stat,
          defense: results[i].data.stats[2].base_stat,
          speed: results[i].data.stats[5].base_stat,
        };
        stats.textContent = JSON.stringify(statsObj);

        labelImg.src = results[i].data.sprites.front_default;

        label.appendChild(inputRadio);
        label.appendChild(labelImg);
        label.appendChild(name);
        label.appendChild(stats);
        choicesCont.appendChild(label);
      }
      form.appendChild(choicesCont);
    } catch (error) {
      console.error(error);
    }
  }
}

const pokemon = new Pokemon();

pokemon.getPokemon();

// Battle button event listener

let button = document.querySelector("button");
button.addEventListener("click", (event) => {
  event.preventDefault();

  selectedPokemon = document.querySelectorAll("input:checked");
  let stats = [];
  let names = [];

  for (let i = 0; i < 2; i++) {
    let parent = selectedPokemon[i].parentElement;
    stats[i] = parent.querySelector("p").textContent;
    names[i] = parent.querySelector("h3").textContent;
  }

  let p1Stats = JSON.parse(stats[0]);
  let p2Stats = JSON.parse(stats[1]);
  console.log(p2Stats);

  if (p1Stats.speed > p2Stats.speed) {
    hpLost = p2Stats.defense - p1Stats.attack;
    p2Stats.hp = p2Stats.hp - hpLost;
    p1Stats.speed = null;
    p2Stats.speed = null;
    console.log(p2Stats);
  } else if (p1Stats.speed < p2Stats.speed) {
    hpLost = p1Stats.defense - p2Stats.attack;
    p1Stats.hp = p1Stats.hp - hpLost;
    p1Stats.speed = null;
    p2Stats.speed = null;
    console.log(p1Stats);
  } else {
    console.log("tie");
  }
});

baseUrl = "https://pokeapi.co/api/v2/";

async function getPokemon() {
  try {
    let response = await axios.get(
      `${baseUrl}pokemon/${Math.floor(Math.random() * 200) + 1}`
    );
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}

getPokemon();

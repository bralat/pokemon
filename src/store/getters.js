export default {
  findPokemon: (state) => (name) => state.pokemons.data[name],
  pokemons: (state) => state.pokemons.keys.map((key) => state.pokemons.data[key]),
};

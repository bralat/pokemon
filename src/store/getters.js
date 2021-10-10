export default {
  pokemons: (state) => state.pokemons.keys.map((key) => state.pokemons.data[key]),
};

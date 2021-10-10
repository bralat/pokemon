export default {
  setQuery(state, prop) {
    state.query = prop;
  },
  setPagination(state, prop) {
    state.pagination = prop;
  },
  setPokemons(state, prop) {
    state.pokemons = prop;
  },
  setPokemonDetails(state, prop) {
    state.pokemons.data[prop.name] = prop;
  },
};

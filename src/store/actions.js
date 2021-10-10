import HTTP from '../plugins/axios';

export default {
  setPokemons({ state, commit }, prop) {
    const oldData = { ...state.pokemons.data };
    const data = {};
    prop.forEach((item) => {
      // if the incoming item exists in the current state,
      // find out which one has more details
      if (item.name in oldData) {
        // if the incoming item has more details, keep it,
        // else maintain the old one
        if ('base_experience' in item) {
          data[item.name] = item;
        } else {
          data[item.name] = oldData[item.name];
        }
      } else {
        data[item.name] = item;
      }
    });

    const keys = Object.keys(data);
    commit('setPokemons', { keys, data });
  },
  setPokemonDetails({ commit }, prop) {
    commit('setPokemonDetails', prop);
  },
  setPagination({ commit }, prop) {
    commit('setPagination', prop);
  },
  setQuery({ state, commit }, prop) {
    const data = { ...prop };
    if (data.limit) {
      data.limit = Number(data.limit);
    }
    if (data.offset) {
      data.offset = Number(data.offset);
    }
    commit('setQuery', Object.assign(state.query, data));
  },
  async getPokemons({ state, dispatch }) {
    const {
      count, next, previous, results,
    } = (await HTTP.get('/', { params: state.query })).data;

    dispatch('setPokemons', results);
    dispatch('setPagination', { count, next, previous });
  },
  async getPokemonDetails({ state, dispatch }, prop) {
    const details = (await HTTP.get(`/${prop}`, { params: state.query })).data;

    dispatch('setPokemonDetails', details);
  },
};

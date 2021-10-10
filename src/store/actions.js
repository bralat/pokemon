export default {
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
};

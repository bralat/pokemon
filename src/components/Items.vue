<template>
  <v-container>
    <v-row justify="space-between" class="mt-5 max-width">
      <v-col
        v-for="item in pokemons"
        :key="item.name"
        cols="12" xs="6" sm="4" md="3">
        <Item :item="item"/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Item from './Item.vue';

export default {
  components: {
    Item,
  },
  methods: {
    fetchItems() {
      this.$store.dispatch('getPokemons');
    },
    checkName(pokemon) {
      if (!(this.query.search_by.includes('name'))) {
        return false;
      }

      return pokemon.name.includes(this.query.search);
    },
    checkAbility(pokemon) {
      if ('abilities' in pokemon) {
        return pokemon.abilities.some((ability) => ability.ability.name.includes(
          this.query.search,
        ));
      }

      return false;
    },
  },
  watch: {
    'query.limit': {
      handler() {
        this.fetchItems();
      },
    },
    'query.offset': {
      handler() {
        this.fetchItems();
      },
    },
  },
  computed: {
    pokemons() {
      let data = this.$store.getters.pokemons;
      if (this.query.search) {
        data = data.filter((pokemon) => {
          const isInName = this.checkName(pokemon);
          const isInAbility = this.checkAbility(pokemon);
          return isInName || isInAbility;
        });
      }

      if (this.query.sort_by) {
        if (this.query.sort_by === 'name') {
          data.sort((a, b) => a[this.query.sort_by].localeCompare(b[this.query.sort_by]));
        } else {
          data.sort((a, b) => a[this.query.sort_by] - b[this.query.sort_by]);
        }
      }
      if (this.query.order && this.query.order === 'descending') {
        data.reverse();
      }

      return data;
    },
    query() {
      return this.$store.state.query;
    },
  },
  mounted() {
    this.fetchItems();
  },
};
</script>

<style lang="scss" scoped>
</style>

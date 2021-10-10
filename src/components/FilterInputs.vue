<template>
  <v-container>
    <v-row>
      <v-col cols="12" class="pb-0 mb-0">
        <v-text-field
          v-model="query.search"
          filled
          class="input-search"
          placeholder="Search for pokemon here ..." />
      </v-col>
    </v-row>
    <v-row :style="formHeightComputed" class="main-form mt-0">
      <v-col cols="12" sm="6" md="3">
        <v-select
          v-model="query.search_by"
          filled
          multiple
          class="input-search_by"
          label="Search by"
         :items="searchByItems"></v-select>
      </v-col>
      <v-col cols="12" sm="6" md="3">
        <v-select
          v-model="query.sort_by"
          filled
          class="input-sort_by"
          label="Sort by"
         :items="sortByItems"></v-select>
      </v-col>
      <v-col cols="12" sm="6" md="3">
        <v-select
          v-model="query.order"
          filled
          class="input-order_by"
          label="Order by"
         :items="orderItems"></v-select>
      </v-col>
      <v-col cols="12" sm="6" md="3">
        <v-select
          v-model="query.limit"
          filled
          class="input-limit"
          label="Pokemons per page"
          :items="numPerPageItems"></v-select>
      </v-col>
    </v-row>
    <v-row v-if="showMore" justify="end">
      <v-btn
        depressed
        color="tertiary"
        class="mr-3 input-more_btn"
        @click="modifyHeight">{{btnText}}</v-btn>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    searchByItems: ['name', 'abilities'],
    sortByItems: ['name', 'height', 'weight'],
    orderItems: ['ascending', 'descending'],
    numPerPageItems: [10, 20, 50],
    formHeight: null,
    isIncreased: false,
  }),
  computed: {
    btnText() {
      return this.isIncreased ? 'Less' : 'More';
    },
    showMore() {
      return ['xs', 'sm'].includes(this.$vuetify.breakpoint.name);
    },
    query() {
      return this.$store.state.query;
    },
    formHeightComputed() {
      return `height: ${this.formHeight}px`;
    },
  },
  methods: {
    modifyHeight() {
      if (this.isIncreased) {
        this.formHeight = 100;
        this.isIncreased = false;
      } else if (this.$vuetify.breakpoint.sm) {
        this.formHeight = 200;
        this.isIncreased = true;
      } else {
        this.formHeight = 450;
        this.isIncreased = true;
      }
    },
    setQuery(val) {
      this.$store.dispatch('setQuery', val || this.$route.query);
    },
  },
  watch: {
    query: {
      deep: true,
      handler(val) {
        this.setQuery(val);
      },
    },
  },
  mounted() {
    this.setQuery();
  },
};
</script>

<style lang="scss" scoped>
.main-form {
  overflow:hidden;
  height: 100px;
}
</style>

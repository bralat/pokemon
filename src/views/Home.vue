<template>
  <v-container>
    <div>
      <h1 class="text-center">Pokemon</h1>
    </div>
    <div>
      <Navbar />
    </div>
    <div>
      <FilterInputs />
    </div>
    <div>
      <Items />
    </div>
    <div>
      <Navbar />
    </div>
  </v-container>
</template>

<script>
import Navbar from '../components/Navbar.vue';
import Items from '../components/Items.vue';
import FilterInputs from '../components/FilterInputs.vue';

export default {
  components: {
    Navbar,
    Items,
    FilterInputs,
  },
};
</script>

<style lang="scss" scoped>
</style>

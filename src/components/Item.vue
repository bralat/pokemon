<template>
  <v-card :to="itemLink" class="card-size">
    <v-img :src="image" class="image img-size">
      <template v-slot:placeholder>
        <v-row
          class="fill-height ma-0"
          align="center"
          justify="center"
        >
          <v-progress-circular
            indeterminate
            color="grey lighten-1"
          ></v-progress-circular>
        </v-row>
      </template>
    </v-img>
    <v-card-title>
      {{item.name}}
    </v-card-title>
    <v-card-text>
      <v-row>
        <v-col cols="12" lg="6" class="pt-0 pb-0">
          Height: {{item.height}}
        </v-col>
        <v-col cols="12" lg="6" class="pt-0 pb-0">
          weight: {{item.weight}}
        </v-col>
        <v-col>
          Abilities:<br>
          <v-chip
            v-for="ab in abilities"
            :key="ab"
            class="mr-1 mt-1 abilities">{{ab}}</v-chip>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    image() {
      const img = this.item?.sprites?.other['official-artwork']?.front_default;
      return img;
    },
    abilities() {
      if (!('abilities' in this.item)) {
        return [];
      }

      return this.item.abilities.map((item) => item.ability.name);
    },
    itemLink() {
      return `details/${this.item.name}`;
    },
  },
  methods: {
    fetchDetails() {
      this.$store.dispatch('getPokemonDetails', this.item.name);
    },
  },
  mounted() {
    this.fetchDetails();
  },
};
</script>

<style lang="scss" scoped>
.card-size {
  min-height: 426px;
}

.img-size {
  min-height: 266px;
}
</style>

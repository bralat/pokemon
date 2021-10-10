<template>
  <v-container>
    <v-row class="mt-15">
      <v-btn depressed color="primary" class="ml-3" @click="goBack()">
        <v-icon>mdi-chevron-left</v-icon>
        Back
      </v-btn>
    </v-row>
    <v-row class="mt-10">
      <v-col>
        <v-row justify="center">
          <v-col cols="12" sm="8" md="6" xl="4">
            <v-card>
              <v-img class="image" :src="image"></v-img>
            </v-card>
          </v-col>
          <v-col cols="12" md="6" xl="5">
            <v-row>
              <h1 class="name ml-3">{{ pokemon.name }}</h1>
            </v-row>
            <v-row>
              <v-col cols="6" sm="4" md="3">
                <v-card
                  elevation="0"
                  color="grey lighten-4"
                  class="pl-3 pt-3 pb-1"
                >
                  <h5>Base Experience</h5>
                  <p>{{ pokemon.base_experience }}</p>
                </v-card>
              </v-col>
              <v-col cols="6" sm="4" md="3">
                <v-card
                  elevation="0"
                  color="grey lighten-4"
                  class="pl-3 pt-3 pb-1"
                >
                  <h5>Height</h5>
                  <p>{{ pokemon.height }}</p>
                </v-card>
              </v-col>
              <v-col cols="6" sm="4" md="3">
                <v-card
                  elevation="0"
                  color="grey lighten-4"
                  class="pl-3 pt-3 pb-1"
                >
                  <h5>Order</h5>
                  <p>{{ pokemon.order }}</p>
                </v-card>
              </v-col>
              <v-col cols="6" sm="4" md="3">
                <v-card
                  elevation="0"
                  color="grey lighten-4"
                  class="pl-3 pt-3 pb-1"
                >
                  <h5>Weight</h5>
                  <p>{{ pokemon.weight }}</p>
                </v-card>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import HTTP from '../plugins/axios';

export default {
  data: () => ({
    pokemon: {},
  }),
  computed: {
    sprites() {
      if ('sprites' in this.pokemon) {
        return Object.values(this.pokemon.sprites).filter(
          (val) => typeof val === 'string',
        );
      }
      return [];
    },
    image() {
      return this.pokemon?.sprites?.other['official-artwork']?.front_default;
    },
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    async getPokemon() {
      const pokemon = this.$store.getters.findPokemon(this.$route.params.name);
      if (!pokemon) {
        this.pokemon = (await HTTP.get(`/${this.$route.params.name}`)).data;
      } else {
        this.pokemon = pokemon;
      }
    },
  },
  mounted() {
    this.getPokemon();
  },
};
</script>

<style lang="scss" scoped>
.image {
  border: 1px solid rgba(grey, 0.5);
  border-radius: 10;
}

.name {
  font-size: 40px;
  text-transform: uppercase;
}

</style>

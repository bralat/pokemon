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
          <v-col cols="12" sm="8" md="6">
            <v-card>
              <v-img class="image" :src="image" :alt="imageAlt"></v-img>
            </v-card>
          </v-col>
          <v-col cols="12" md="6">
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
              <v-col cols="6" sm="4" md="3">
                <v-card elevation="0" class="pl-3 pt-3 pb-1 border-card">
                  <h5>Abilites</h5>
                  <br />
                  <v-chip v-for="ab in abilities" :key="ab" class="mr-1 mt-1">{{
                    ab
                  }}</v-chip>
                </v-card>
              </v-col>
              <v-col cols="6" sm="4" md="3">
                <v-card elevation="0" class="pl-3 pt-3 pb-1 border-card">
                  <h5>Forms</h5>
                  <br />
                  <v-chip
                    v-for="form in pokemon.forms"
                    :key="form.name"
                    class="mr-1 mt-1"
                    >{{ form.name }}</v-chip
                  >
                </v-card>
              </v-col>
              <v-col cols="12">
                <v-card elevation="0" class="pl-3 pt-3 pb-1 border-card">
                  <h5>Game Indices</h5>
                  <br />
                  <v-chip
                    v-for="gi in pokemon.game_indices"
                    :key="gi.game_index"
                    class="mr-1 mt-1"
                    >{{ gi.version.name }}</v-chip
                  >
                </v-card>
              </v-col>
              <v-col cols="12">
                <v-card elevation="0" class="pl-3 pt-3 pb-1 border-card">
                  <h5>Held Items</h5>
                  <br />
                  <v-chip
                    v-for="item in pokemon.held_items"
                    :key="item.item.name"
                    class="mr-1 mt-1"
                    >{{ item.item.name }}</v-chip
                  >
                </v-card>
              </v-col>
              <v-col cols="12">
                <v-card elevation="0" class="pl-3 pt-3 pb-1 border-card">
                  <h5>Moves</h5>
                  <br />
                  <v-chip
                    v-for="item in pokemon.moves"
                    :key="item.move.name"
                    class="mr-1 mt-1"
                    >{{ item.move.name }}</v-chip
                  >
                </v-card>
              </v-col>
              <v-col cols="12">
                <v-card elevation="0" class="pl-3 pt-3 pb-1 border-card">
                  <h5>Species</h5>
                  <br />
                  <v-chip class="mr-1 mt-1">
                    {{ pokemon.species ? pokemon.species.name : '' }}
                  </v-chip>
                </v-card>
              </v-col>
              <v-col cols="12">
                <v-card elevation="0" class="pl-3 pt-3 pb-1 border-card">
                  <h5>Sprites</h5>
                  <br />
                  <v-row>
                    <v-col cols="3" v-for="item in sprites" :key="item">
                      <v-img
                        max-width="200"
                        max-height="200"
                        :src="item"
                      ></v-img>
                    </v-col>
                  </v-row>
                </v-card>
              </v-col>
              <v-col cols="12">
                <v-card elevation="0" class="pl-3 pt-3 pb-1 border-card">
                  <h5>Stats</h5>
                  <br />
                  <v-chip
                    v-for="item in pokemon.stats"
                    :key="item.stat.name"
                    class="mr-1 mt-1"
                    >{{ item.stat.name }}: {{ item.base_stat }}</v-chip
                  >
                </v-card>
              </v-col>
              <v-col cols="12">
                <v-card elevation="0" class="pl-3 pt-3 pb-1 border-card">
                  <h5>Types</h5>
                  <br />
                  <v-chip
                    v-for="item in pokemon.types"
                    :key="item.type.name"
                    class="mr-1 mt-1"
                    >{{ item.type.name }}: {{ item.slot }}</v-chip
                  >
                </v-card>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-row class="mt-15">
      <v-btn depressed color="primary" class="ml-3 mb-10" @click="goBack()">
        <v-icon>mdi-chevron-left</v-icon>
        Back
      </v-btn>
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
    imageAlt() {
      return `default image for ${this.pokemon.name}`;
    },
    abilities() {
      if (!('abilities' in this.pokemon)) {
        return [];
      }

      return this.pokemon.abilities.map((pokemon) => pokemon.ability.name);
    },
    image() {
      return this.pokemon?.sprites?.other['official-artwork']?.front_default;
    },
    sprites() {
      if ('sprites' in this.pokemon) {
        return Object.values(this.pokemon.sprites).filter(
          (val) => typeof val === 'string',
        );
      }
      return [];
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

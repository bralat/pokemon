<template>
  <v-app>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  computed: {
    query() {
      return this.$store.state.query;
    },
  },
  watch: {
    query: {
      deep: true,
      handler(val) {
        this.$router.replace({
          query: Object.assign(this.query, val),
        });
      },
    },
  },
};
</script>

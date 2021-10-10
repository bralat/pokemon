<template>
  <v-container>
    <v-row justify="space-between" class="mt-5 max-width">
      <v-btn depressed color="primary" @click="previous" class="btn-previous ml-3">
        <v-icon>mdi-chevron-left</v-icon>
        Previous
      </v-btn>
      <div class="mt-2">{{ page_number }}/{{ pages_count }}</div>
      <v-btn depressed color="primary" @click="next" class="btn-next mr-3">
        Next
        <v-icon> mdi-chevron-right </v-icon>
      </v-btn>
    </v-row>
  </v-container>
</template>

<script>
export default {
  methods: {
    updateOffset(offset) {
      window.scrollTo(0, 0);
      this.$store.dispatch('setQuery', { offset });
    },
    next() {
      const offset = this.query.offset + this.query.limit;
      if (offset < this.pagination.count) {
        this.updateOffset(offset);
      }
    },
    previous() {
      if (this.query.limit > this.query.offset) {
        this.updateOffset(0);
      } else {
        const offset = this.query.offset - this.query.limit;
        if (offset >= 0) {
          this.updateOffset(offset);
        }
      }
    },
  },
  computed: {
    query() {
      return this.$store.state.query;
    },
    pagination() {
      return this.$store.state.pagination;
    },
    page_number() {
      if (!this.query.offset) {
        return 1;
      }
      return Math.ceil(this.query.offset / this.query.limit + 1);
    },
    pages_count() {
      return Math.ceil(this.pagination.count / this.query.limit) || 1;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>

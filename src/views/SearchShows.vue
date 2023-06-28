<template>
  <div>
    <input type="text" v-model="searchQuery" placeholder="Search shows" />
    <ul>
      <li v-for="show in filteredShows" :key="show.id">
        {{ show.title }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    shows: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      searchQuery: ``,
    };
  },
  computed: {
    filteredShows() {
      const query = this.searchQuery.toLowerCase();
      return this.shows.filter((show) =>
        show.title.toLowerCase().includes(query)
      );
    },
  },
};
</script>

<style scoped>
ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin-bottom: 5px;
}
</style>

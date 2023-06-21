<template>
  <div>
    <h2>Favorite Shows</h2>
    <ul v-if="favoriteShows.length">
      <li v-for="show in favoriteShows" :key="show.id">
        {{ show.title }}
        <button @click="removeFromFavorites(show.id)">Remove</button>
      </li>
    </ul>
    <div v-else>No favorite shows found.</div>
  </div>
</template>

<script>
export default {
  props: {
    favoriteShows: {
      type: Array,
      required: true,
    },
  },
  methods: {
    removeFromFavorites(showId) {
      // Emit an event to notify the parent component to remove the show from favorites
      this.$emit(`remove`, showId);
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

button {
  margin-left: 10px;
}
</style>

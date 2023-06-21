<template>
  <div>
    <h2>{{ show.title }}</h2>
    <h3>Genre: {{ show.genre }}</h3>

    <h4>Reviews/Comments:</h4>
    <ul v-if="show.reviews.length">
      <li v-for="review in show.reviews" :key="review.id">
        {{ review.text }} - by {{ review.user }}
      </li>
    </ul>
    <div v-else>No reviews/comments available.</div>

    <h4>Cast/Actors:</h4>
    <ul v-if="show.cast.length">
      <li v-for="actor in show.cast" :key="actor.id">
        {{ actor.name }}
      </li>
    </ul>
    <div v-else>No cast/actors information available.</div>

    <h4>Ratings:</h4>
    <ul v-if="show.ratings.length">
      <li v-for="rating in show.ratings" :key="rating.id">
        {{ rating.source }}: {{ rating.value }}
      </li>
    </ul>
    <div v-else>No ratings available.</div>
  </div>
</template>

<script>
export default {
  props: {
    show: {
      type: Object,
      required: true,
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

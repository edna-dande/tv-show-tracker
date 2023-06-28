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
    <h4>Rate the Show</h4>
    <div>
      <label for="rating">Rating:</label>
      <select id="rating" v-model="userRating" @change="rateShow">
        <option value="">Select rating</option>
        <option
          v-for="rating in availableRatings"
          v-bind:key="rating"
          :value="rating"
        >
          {{ rating }}
        </option>
      </select>
    </div>

    <div v-if="show.rating">
      <p>Average Rating: {{ show.rating }}</p>
      <p>Total Ratings: {{ show.totalRatings }}</p>
    </div>
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
  data() {
    return {
      userRating: ``,
    };
  },
  computed: {
    showWithRating() {
      // Create a copy of the show object and add the rating properties
      return {
        ...this.show,
        rating: this.calculateNewRating(this.userRating),
        totalRatings: this.show.totalRatings + 1,
      };
    },
    availableRatings() {
      return [1, 2, 3, 4, 5]; // Update with your desired rating values
    },
  },
  methods: {
    rateShow() {
      // Perform rating logic here
      // You can emit an event to notify the parent component about the rating change

      // For demonstration purposes, let's simply update the show's rating and totalRatings
      if (this.userRating !== ``) {
        // this.show.rating = this.calculateNewRating(this.userRating);
        // this.show.totalRatings++;
      }
    },
    calculateNewRating(newRating) {
      const currentRating = this.show.rating;
      const totalRatings = this.show.totalRatings;

      // Calculate the new average rating based on the current rating and total ratings
      const newTotalRatings = totalRatings + 1;
      const newAverageRating =
        (currentRating * totalRatings + newRating) / newTotalRatings;

      return newAverageRating.toFixed(1); // Round to one decimal place
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

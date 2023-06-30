<template>
  <div>
    <h2>{{ show !== null ? show.title : "" }}</h2>
    <h3>Genre: {{ show !== null ? show.name : "" }}</h3>

    <h4>Reviews/Comments:</h4>
    <ul v-if="show !== null && show.reviews !== null && show.reviews.length">
      <li v-for="review in show.reviews" :key="review.id">
        {{ review.text }} - by {{ review.user }}
      </li>
    </ul>
    <div v-else>No reviews/comments available.</div>

    <h4>Cast/Actors:</h4>
    <ul v-if="show !== null && show.cast !== null && show.cast.length">
      <li v-for="actor in show.cast" :key="actor.id">
        {{ actor.name }}
      </li>
    </ul>
    <div v-else>No cast/actors information available.</div>

    <h4>Ratings:</h4>
    <ul v-if="show !== null && show.ratings !== null && show.ratings.length">
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
        <option v-for="rating in availableRatings" :key="rating" :value="rating">
          {{ rating }}
        </option>
      </select>
    </div>

    <div v-if="show !== null && show.rating">
      <p>Average Rating: {{ show !== null && show.rating ? show.rating : "" }}</p>
      <p>Total Ratings: {{ show !== null && show.totalRatings ? show.totalRatings : "" }}</p>
    </div>
  </div>
</template>

<script>
// import axios
import axios from "axios";
import { mapGetters } from "vuex";
export default {
  props: {},
  data() {
    return {
      userRating: ``,
      show: null,
      availableRatings: [1, 2, 3, 4, 5], // Update with your desired rating values
    };
  },
  created: function () {
    this.getTvShowById();
  },
  computed: {
    ...mapGetters(["isLoggedIn", "getToken"]),
    showWithRating() {
      // Create a copy of the show object and add the rating properties
      return {
        ...this.show,
        rating: this.calculateNewRating(this.userRating),
        totalRatings: this.show.totalRatings + 1,
      };
    },
  },
  methods: {
    // Get Show By Id
    async getTvShowById() {
      if (!this.isLoggedIn) {
        this.$router.push('/');
      }
      axios.defaults.headers.common['Authorization'] = `Bearer ${this.getToken}`;
      try {
        const response = await axios.get(
          `http://localhost:3002/show/${this.$route.params.id}`
        );
        this.show = response.data;
      } catch (err) {
        console.log(err);
      }
    },
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

<template>
  <div>
    <div class="background">
      <NavBar />
    </div>
    <div class="container">
      <div class="actions">
        <button @click="editShow()" class="btn btn-outline-secondary"><font-awesome-icon icon="fa-solid fa-pen-to-square" /></button>
        <button @click="deleteTvShow()" class="btn btn-outline-secondary"><font-awesome-icon icon="fa-solid fa-trash" style="color: #f50a0a;" /></button>
        <button @click="unsubscribeShow()" class="btn btn-outline-secondary" v-if="show !== null && show.subscribed"><font-awesome-icon icon="fa-solid fa-xmark" style="color: #ff99c5;" /></button>
        <button @click="subscribeShow()" class="btn btn-outline-secondary" v-else><font-awesome-icon icon="fa-solid fa-check" beat-fade style="color: #69dd80;" /></button>
        <button @click="unfavoriteTvShow()" class="btn btn-outline-secondary" v-if="show !== null && show.favourited"><font-awesome-icon icon="fa-solid fa-heart" style="color: #c1ef6b;" /></button>
        <button @click="favoriteTvShow()" class="btn btn-outline-secondary" v-else><font-awesome-icon icon="fa-regular fa-heart" /></button>
      </div>
      <h2>{{ show !== null ? show.title : "" }}</h2>
      <h3>Genre: {{ show !== null ? show.name : "" }}</h3>

      <h4>Reviews/Comments:</h4>
      <ul v-if="show !== null && show.reviews !== null && show.reviews?.length">
        <li v-for="review in show.reviews" :key="review.id">
          {{ review.text }} - by {{ review.user }}
        </li>
      </ul>
      <div v-else>No reviews/comments available.</div>

      <h4>Cast/Actors:</h4>
      <ul v-if="show !== null && show.cast !== null && show.cast?.length">
        <li v-for="actor in show.cast" :key="actor.id">
          {{ actor.name }}
        </li>
      </ul>
      <div v-else>No cast/actors information available.</div>

      <h4>Ratings:</h4>
      <ul v-if="show !== null && show.ratings !== null && show.ratings?.length">
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
  </div>
</template>

<script>
// import axios
import axios from "axios";
import NavBar from "../components/NavBar.vue";
import { mapGetters } from "vuex";
export default {
  components: {
    NavBar,
  },
  props: {},
  data() {
    return {
      userRating: ``,
      show: {},
      subscriptions: null,
      favourites: null,
      availableRatings: [1, 2, 3, 4, 5], // Update with your desired rating values
    };
  },
  created: function () {
    this.getTvShowById();
  },
  computed: {
    ...mapGetters(["isLoggedIn", "getToken", "getUser"]),
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
          `http://localhost:3002/show/${this.$route.params.id}?user=${this.getUser.id}`
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
     // Delete Tv Show
     async deleteTvShow() {
      if (!this.isLoggedIn) {
        this.$router.push('/');
      }
      axios.defaults.headers.common['Authorization'] = `Bearer ${this.getToken}`;
      try {
        const confirmed = confirm(
          `Are you sure you want to delete this TV show?`
        );
        if (confirmed) {
          await axios.delete(`http://localhost:3002/show/${this.$route.params.id}`);
          this.$router.push('/showlist');
        }
      } catch (err) {
        console.log(err);
      }
    },
    // Subscribe Tv Show
    async subscribeShow() {
      if (!this.isLoggedIn) {
        this.$router.push(`/`);
      }
      axios.defaults.headers.common['Authorization'] = `Bearer ${this.getToken}`;
      try {
          await axios.get(`http://localhost:3002/subscribe/${this.$route.params.id}?user=${this.getUser.id}`);
          this.getTvShowById();
      } catch (err) {
        console.log(err);
      }
    },
    // Unsubscribe Tv Show
    async unsubscribeShow() {
      if (!this.isLoggedIn) {
        this.$router.push(`/`);
      }
      axios.defaults.headers.common['Authorization'] = `Bearer ${this.getToken}`;
      try {
          await axios.delete(`http://localhost:3002/subscribe/${this.$route.params.id}?user=${this.getUser.id}`);
          this.getTvShowById();
      } catch (err) {
        console.log(err);
      }
    },
    //Add to Favorites
    async favoriteTvShow() {
      if (!this.isLoggedIn) {
        this.$router.push(`/`);
      }
      axios.defaults.headers.common['Authorization'] = `Bearer ${this.getToken}`;
      try {
          await axios.get(`http://localhost:3002/favourite/${this.$route.params.id}?user=${this.getUser.id}`);
          this.getTvShowById();
      } catch (err) {
        console.log(err);
      }
    },
    //Remove from Favorites
    async unfavoriteTvShow() {
      if (!this.isLoggedIn) {
        this.$router.push(`/`);
      }
      axios.defaults.headers.common['Authorization'] = `Bearer ${this.getToken}`;
      try {
          await axios.delete(`http://localhost:3002/favourite/${this.$route.params.id}?user=${this.getUser.id}`);
          this.getTvShowById();
      } catch (err) {
        console.log(err);
      }
    },
    editShow() {
      // Handle logic for editing a TV show
      // You can redirect to a dedicated editing page or open a modal for editing the show
      // Implement your desired logic here
      // alert(`Edit TV Show: ` + show.title);
      this.$router.push(`/edit/${this.$route.params.id}`);
    },
  },
};
</script>

<style scoped>
.btn {
  border-radius: 40px;
  margin-right: 10px;
  float: right;
}
ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin-bottom: 5px;
}
</style>

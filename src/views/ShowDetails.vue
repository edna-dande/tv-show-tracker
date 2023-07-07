<template>
  <div>
    <div class="background">
      <NavBar />
      <p class="title">{{ show !== null ? show.title : "" }}</p>
    </div>
    <div class="container">
      <div class="actions">
        <button @click="editShow()" style="background-color: white;" class="btn btn-outline-secondary"><font-awesome-icon icon="fa-solid fa-pen-to-square" /></button>
        <button @click="deleteTvShow()" style="background-color: white;" class="btn btn-outline-secondary"><font-awesome-icon icon="fa-solid fa-trash" style="color: #f50a0a;" /></button>
        <button @click="unsubscribeShow()" style="background-color: white;" class="btn btn-outline-secondary" v-if="show !== null && show.subscribed"><font-awesome-icon icon="fa-solid fa-xmark" style="color: #ff99c5;" /></button>
        <button @click="subscribeShow()" style="background-color: white;" class="btn btn-outline-secondary" v-else><font-awesome-icon icon="fa-solid fa-check" beat-fade style="color: #69dd80;" /></button>
        <button @click="unfavoriteTvShow()" style="background-color: white;" class="btn btn-outline-secondary" v-if="show !== null && show.favourited"><font-awesome-icon icon="fa-solid fa-heart" style="color: #c1ef6b;" /></button>
        <button @click="favoriteTvShow()" style="background-color: white;" class="btn btn-outline-secondary" v-else><font-awesome-icon icon="fa-regular fa-heart" /></button>
      </div>
      <h3>Genre: </h3>
      <ul><li>{{ show !== null ? show.name : "" }}</li></ul>

      <h3>Cast/Actors:</h3>
      <ul v-if="show !== null && show.cast !== null && show.cast?.length">
        <li v-for="actor in show.cast" :key="actor.id">
          {{ actor.name }}
        </li>
      </ul>
      <div v-else>No cast/actors information available.</div>

      <h3>Rating:</h3>
      <div class="ratings">
        <div v-if="show !== null && show.ratings !== null && show.ratings?.value">
          <button v-if="show.ratings.value == 1" style="background-color: white;" class="btn btn-outline-success" disabled><font-awesome-icon icon="fa-solid fa-thumbs-up" style="color: #166f28;" /></button>
          <button v-else-if="show.ratings.value == 2" style="background-color: white;" class="btn btn-outline-danger" disabled><font-awesome-icon icon="fa-solid fa-thumbs-down" style="color: #68222c;" /></button>
        </div>
        <div v-else>
          <button style="background-color: white;" class="btn btn-outline-secondary" @click="rateShow(1)"><font-awesome-icon icon="fa-regular fa-thumbs-up" /></button>
          <button style="background-color: white;" class="btn btn-outline-secondary" @click="rateShow(2)"><font-awesome-icon icon="fa-regular fa-thumbs-down" /></button>
        </div>
      </div>
      <!-- <ul v-if="show !== null && show.ratings !== null && show.ratings?.length">
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
      </div> -->

      <!-- <div v-if="show !== null && show.rating">
        <p>Average Rating: {{ show !== null && show.rating ? show.rating : "" }}</p>
        <p>Total Ratings: {{ show !== null && show.totalRatings ? show.totalRatings : "" }}</p>
      </div> -->
      <h4>Reviews:</h4>
      <div v-if="show !== null && show.reviews !== null && show.reviews?.length">
        <div v-for="review in show.reviews" :key="review.id" class="reviews">
          <p class="username">{{ review.name }}:</p>
          <p class="content">{{ review.content }}</p>
        </div>
      </div>
      <div>
        <p>Add review</p>
        <textarea rows=3 v-model="comment" class="form-control"></textarea>
        <button class="btn btn-info" @click="reviewShow">Submit</button>
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
      comment: '',
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
    // Rate Tv Show
    async rateShow(rate) {
      if (!this.isLoggedIn) {
        this.$router.push(`/`);
      }
      axios.defaults.headers.common['Authorization'] = `Bearer ${this.getToken}`;
      const data = {
        rating: rate,
        user: this.getUser.id,
        id: this.$route.params.id
      };
      try {
        await axios.post("http://localhost:3002/rate", data);
        this.getTvShowById();
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
    async reviewShow() {
        if (!this.isLoggedIn) {
        this.$router.push('/');
      }

      axios.defaults.headers.common['Authorization'] = `Bearer ${this.getToken}`;

      // const data = new FormData();
      // data.append('comment', this.comment);
      // data.append('user', this.getUser.id);
      // data.append('id', this.$route.params.id)

      const data = {
        comment: this.comment,
        user: this.getUser.id,
        id: this.$route.params.id
      };
      
      try {
        await axios.post("http://localhost:3002/review", data);
        this.comment = "";
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

<style  lang="scss" scoped>
.background {
  background-image: url("/background.jpg");
  // box-shadow: inset 0 0 0 100vmax rgba(136, 127, 127, 0.7);
  background-repeat: no-repeat;
  background-size: cover;
  height: 600px;
  position: relative;
}
.viewshow{
  background: inherit;
    width: 40px;
    cursor: pointer;
    border-radius: 30px;
    height: 40px;
    border: solid 1px;
    float: right;
    color: white;
}
.container {
  margin-top: 5%;
  color: white;
  border-radius: 12px;
  padding-top: 15px;
  .btn {
    border-radius: 40px;
    margin-right: 10px;
    margin-top: 5px;
  }
  .actions {
    .btn {
      float: right;
    }
  }
  .reviews {
    padding: 5px 10px;
    border-radius: 15px;
    background-color: rgb(30, 77, 118);
    margin-bottom: 10px;
    .username {
      font-weight: 700;
      margin-bottom: unset;
      color: navy-blue;
    }
    .content {
      margin-bottom: unset;
    }
  }
}
.title {
  color: white;
  position:absolute;
  bottom: 20px;
  padding-left: 20px;
  font-size: 50px;
}
ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin-bottom: 5px;
}
</style>

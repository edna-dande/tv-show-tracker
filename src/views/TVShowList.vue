<template>
  <div>
    <h2>TV Shows</h2>
    <NavBar />
    <button @click="createShow">Add TV Show</button>
    <div class="container" >
      <div class="row">
        <div v-for="show in shows" :key="show.id" class="col-lg-4 col-sm-12">
          <div class="data-card">
            <div class="show-poster">
              <!-- Show Poster Image -->
              <!-- <img width="300px" :src="show.image" alt="show-image" /> -->
            </div>
            <div class="show-details">
              <h3 class="show-title">{{ show.title }}</h3>
              <p class="show-genre">{{ show.name }}</p>
              <div class="actions">
                <button @click="viewShow(show.id)">View</button>
                <button @click="editShow(show)">Edit</button>
                <button @click="deleteTvShow(show.id)">Delete</button>
                <button @click="subscribeShow(show)">Subscribe</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div> 
  </div>
</template>

<script>
// import axios
/* eslint-disable */ 
import axios from "axios";
import NavBar from "../components/NavBar.vue";
import { mapGetters } from "vuex";
export default {
  components: {
    NavBar,
  },
  data() {
    return {
      shows: [],
    };
  },
  computed: {
    ...mapGetters(["isLoggedIn", "getToken", "getUser"]),
  },
  created: function () {
    this.getShows();
  },
  methods: {
    // Get All Shows
    async getShows() {
      if (!this.isLoggedIn) {
        this.$router.push('/');
      }
      axios.defaults.headers.common['Authorization'] = `Bearer ${this.getToken}`;
      try {
        const response = await axios.get("http://localhost:3002/showlist");
        this.shows = response.data;
        console.log(this.shows);
      } catch (err) {
        console.log(err);
      }
    },
    // Delete Tv Show
    async deleteTvShow(id) {
      if (!this.isLoggedIn) {
        this.$router.push('/');
      }
      axios.defaults.headers.common['Authorization'] = `Bearer ${this.getToken}`;
      try {
        const confirmed = confirm(
          `Are you sure you want to delete this TV show?`
        );
        if (confirmed) {
          await axios.delete(`http://localhost:3002/show/${id}`);
          this.getShows();
        }
      } catch (err) {
        console.log(err);
      }
    },
    async subscribeTvShow(id) {
      if (!this.isLoggedIn) {
        this.$router.push('/');
      }
      axios.defaults.headers.common['Authorization'] = `Bearer ${this.getToken}`;
      try {
        const confirmed = confirm(
          `Are you sure you want to delete this TV show?`
        );
        if (confirmed) {
          await axios.delete(`http://localhost:3002/show/${id}`);
          this.getShows();
        }
      } catch (err) {
        console.log(err);
      }
    },
    viewShow(id) {
      this.$router.push("/showdetails/" + id);
    },
    createShow() {
      this.$router.push("/create");
    },
    editShow(show) {
      // Handle logic for editing a TV show
      // You can redirect to a dedicated editing page or open a modal for editing the show
      // Implement your desired logic here
      alert(`Edit TV Show: ` + show.title);
    },
  },
};
</script>

<style scoped>
/* table {
  width: 100%;
}
th,
td {
  padding: 10px;
  text-align: left;
} */

button {
  margin-right: 10px;
  border-radius: 30px;
  margin-left: 20px;
  margin-bottom: 10px;
  margin-top: 10px;
  padding: 5px;
}
/* .container{
  display: flex;
} */
.data-card {
  /* width: 400px;
  /* height: 150px; */
  border: 1px solid #d6d3d3;
  border-radius: 10px; 
  margin-left: 20px;
  background-image: url("/pretty.jpg");
  box-shadow: inset 0 0 0 100vmax rgba(195, 163, 163, 0.1);
  background-repeat: no-repeat;
  background-size: cover;
  /* display: flex; */
  /* flex-direction: column; */
  padding: 10px;
}
.show-details{
  color: white;
}
</style>

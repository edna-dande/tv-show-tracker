<template>
    <div>
      <NavBar />
      <form class="edit-form" @submit.prevent="updateShow">
      <h2>Edit TV Show</h2>
        <!-- Form fields to edit the show details -->
        <!-- For example: -->
        <label for="title">Title:</label>
        <input class="form-control" type="text" v-model="editedShow.title" id="title">
  
        <label for="name">Genre:</label>
        <select class="form-control" type="text" id="name" v-model="editedShow.genre_id" required>
        <option v-for="item in genres" :value="item.id" :key="item.id">
          {{ item.name }}
        </option>
      </select>
  
        <!-- Add other fields as needed -->
        <div class="d-grid gap-2" style='margin-bottom: 10px;'>
        <button @click="updateShow" class="btn btn-primary btn-md" style="margin-top: 2%;;" type="submit">Save Changes</button>
        </div>
      </form>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  import NavBar from "../components/NavBar.vue";
  import { mapGetters } from "vuex";
  
  export default {
    components: {
    NavBar,
    },
    data() {
      return {
        genres: {},
        editedShow: {
          title: "",
          genre_id: "",
          // Add other fields as needed to store the edited show data
        },
      };
    },
    computed: {
    ...mapGetters(["isLoggedIn", "getToken", "getUser"]),
    },
    created() {
      // Fetch the show details based on the show ID from the URL parameter
      this.getShowDetails();
      this.getGenres();
    },
    methods: {
      async getShowDetails() {
        try {
          const showId = this.$route.params.id;
          const response = await axios.get(`http://localhost:3002/show/${showId}`);
          this.editedShow.genre_id = response.data.genre_id;
          this.editedShow.title = response.data.title;
        } catch (err) {
          console.log(err);
        }
      },
      async updateShow() {
        try {
          const showId = this.$route.params.id;
          await axios.put(`http://localhost:3002/show/${showId}`, this.editedShow);
          // Optionally, you can show a success message or navigate back to the TV show list
          this.$router.push(`/showdetails/${showId}`);
        } catch (err) {
          console.log(err);
        }
      },
      async getGenres() {
      if (!this.isLoggedIn) {
        this.$router.push('/');
      }
      axios.defaults.headers.common['Authorization'] = `Bearer ${this.getToken}`;
      try {
        const response = await axios.get("http://localhost:3002/genres");
        this.genres = response.data;
      } catch (err) {
        console.log(err);
      }
    },
    },
  };
  </script>

  <style>
.edit-form {
  padding-bottom: 20px;
    background-color: white;
    margin-top: 70px;
    padding-top: 20px;
    border-radius: 12px;
    margin-right: 100px;
    margin-left: 100px;
    padding-left: 20px;
    padding-right: 20px;
}
</style>
  
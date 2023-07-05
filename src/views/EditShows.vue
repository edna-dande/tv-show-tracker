<template>
    <div>
      <h2>Edit TV Show</h2>
      <form @submit.prevent="updateShow">
        <!-- Form fields to edit the show details -->
        <!-- For example: -->
        <label for="title">Title:</label>
        <input type="text" v-model="editedShow.title" id="title">
  
        <label for="name">Genre:</label>
        <input type="text" v-model="editedShow.name" id="name">
  
        <!-- Add other fields as needed -->
  
        <button type="submit">Save Changes</button>
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
        editedShow: {
          title: "",
          name: "",
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
    },
    methods: {
      async getShowDetails() {
        try {
          const showId = this.$route.params.id;
          const response = await axios.get(`http://localhost:3002/show/${showId}`);
          this.editedShow = response.data;
        } catch (err) {
          console.log(err);
        }
      },
      async updateShow() {
        try {
          const showId = this.$route.params.id;
          await axios.put(`http://localhost:3002/show/${showId}`, this.editedShow);
          // Optionally, you can show a success message or navigate back to the TV show list
          this.$router.push("/");
        } catch (err) {
          console.log(err);
        }
      },
    },
  };
  </script>
  
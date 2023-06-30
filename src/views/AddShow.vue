<template>
  <div>
    <div class="form-group">
      <label for="name">Name:</label>
      <input id="name" type="text" v-model="name" required />
    </div>
    <div class="form-group">
      <label for="genre">Genre:</label>
      <select id="genre" v-model="genre" required>
        <option v-for="item in genres" :value="item.id" :key="item.id">
          {{ item.name }}
        </option>
      </select>
    </div>
    <div class="form-group">
      <label for="actors">Actors:</label>
      <select id="actors" v-model="cast" multiple required>
        <option v-for="item in actors" :value="item.id" :key="item.id">
          {{ item.name }}
        </option>
      </select>
    </div>
    <div class="submit">
      <button @click="saveShow">SAVE</button>
    </div>
  </div>
</template>
<script>
// import axios
import axios from "axios";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      name: "",
      genre: "",
      genres: {},
      actors: {},
      cast: [],
    };
  },
  computed: {
    ...mapGetters(["isLoggedIn", "getToken"]),
  },
  created: function () {
    this.getActors();
    this.getGenres();
  },
  methods: {
    // Get Actors
    async getActors() {
        if (!this.isLoggedIn) {
        this.$router.push('/');
      }
      axios.defaults.headers.common['Authorization'] = `Bearer ${this.getToken}`;
      try {
        const response = await axios.get("http://localhost:3002/actors");
        this.actors = response.data;
      } catch (err) {
        console.log(err);
      }
    },
    // Get Genres
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
    // Create New ?Tv Show
    async saveShow() {
        if (!this.isLoggedIn) {
        this.$router.push('/');
      }
      axios.defaults.headers.common['Authorization'] = `Bearer ${this.getToken}`;
      try {
        await axios.post("http://localhost:3002/tvshows", {
          name: this.name,
          genre_id: this.genre,
          cast: this.cast,
        });
        this.name = "";
        this.genre = "";
        this.cast = [];
        this.$router.push("/showlist");
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>
<style>
.form-group{
  padding: 10px
}
</style>

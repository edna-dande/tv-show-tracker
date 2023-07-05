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
      <label for="actors">Image:</label>
      <input type="file" name="image" accept='image/*' ref="imageInput" >
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
import NavBar from "../components/NavBar.vue";
import { mapGetters } from "vuex";
export default {
  components: {
    NavBar,
  },
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
      axios.defaults.headers.common['Content-Type'] = `multipart/form-data`;

      let imageFile = this.$refs.imageInput.files[0];

      const data = new FormData();
      data.append('name', this.name);
      data.append('genre_id', this.genre);
      data.append('cast', this.cast);
      data.append('image', imageFile);

      // let data = {
      //     name: this.name,
      //     genre_id: this.genre,
      //     cast: this.cast,
      //     image: imageFile, // wont work
      // };

      // let data = new Object();
      // data.name = this.name;
      // data.genre_id = this.genre;
      // data.cast = this.cast;
      // data.image = imageFile; // wont work

      try {
        await axios.post("http://localhost:3002/tvshows", data);
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

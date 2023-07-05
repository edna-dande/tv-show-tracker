<template>
  <div>
    <div class="background">
      <NavBar />
    </div>
    <h2 class="title">TV Shows</h2>
    <button class="addshow" @click="createShow"><font-awesome-icon icon="fa-solid fa-plus" /></button>
    <div class="container" >
      <div class="row">
        <div v-for="show in shows" :key="show.id" class="col-lg-4 col-sm-12">
          <div class="data-card" @click="viewShow(show.id)">
            <div class="show-poster">
              <!-- Show Poster Image -->
              <!-- <img width="300px" :src="show.image" alt="show-image" /> -->
            </div>
            <div class="show-details">
              <h3 class="show-title">{{ show.title }}</h3>
              <p class="show-genre">{{ show.name }}</p>
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
    createShow() {
      this.$router.push("/create");
    },
    viewShow(id) {
      this.$router.push("/showdetails/" + id);
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
.background {
  background-image: url("/background.jpg");
  box-shadow: inset 0 0 0 100vmax rgba(136, 127, 127, 0.7);
  background-repeat: no-repeat;
  background-size: cover;
  height: 600px;
}
.title{
  float: left;
}
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

.addshow{
  background: inherit;
    width: 40px;
    cursor: pointer;
    border-radius: 30px;
    height: 40px;
    border: solid 1px;
    float: right;
}
.container{
  clear: both;
}
.show-details{
  color: white;
}
</style>

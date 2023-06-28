<template>
  <div>
    <h2>TV Shows</h2>
    <NavBar />
    <button @click="createShow">Add TV Show</button>
    <table>
      <thead>
        <tr>
          <th>Title</th>
          <th>Genre</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="show in shows" :key="show.id">
          <td>{{ show.title }}</td>
          <td>{{ show.genre }}</td>
          <td>
            <button @click="viewShow(show.id)">View</button>
            <button @click="editShow(show)">Edit</button>
            <button @click="deleteTvShow(show.id)">Delete</button>
            <button @click="subscribeShow(show)">Subscribe</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import NavBar from "../components/NavBar.vue";
export default {
  components: {
    NavBar,
  },
  data() {
    return {
      shows: [],
    };
  },
  created: function() {
    this.getShows();
  },
  methods: {
    // Get All Shows
    async getShows() {
      try {
        const response = await axios.get("http://localhost:3002/showlist");
        this.shows = response.data;
      } catch (err) {
        console.log(err);
      }
    },
  
    // Delete Tv Show
    async deleteTvShow(id) {
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
      this.$router.push("/showdetails/"+id);
    },
    createShow() {
      // Handle logic for creating a new TV show
      // You can redirect to a dedicated creation page or open a modal for creating a show
      // Implement your desired logic here
      alert(`Create TV Show`);
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
table {
  width: 100%;
}
th,
td {
  padding: 10px;
  text-align: left;
}

button {
  margin-right: 5px;
}
</style>

<template>
  <div>
    <h2>TV Shows</h2>
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
            <button @click="editShow(show)">Edit</button>
            <button @click="deleteShow(show.id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
    <button @click="createShow">Add TV Show</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      shows: [
        // Sample data for demonstration purposes
        { id: 1, title: `Show 1`, genre: `Drama` },
        { id: 2, title: `Show 2`, genre: `Comedy` },
        { id: 3, title: `Show 3`, genre: `Action` },
      ],
    };
  },
  methods: {
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
    deleteShow(showId) {
      // Handle logic for deleting a TV show
      // Implement your desired logic here
      // For example, you can show a confirmation dialog and then remove the show from the list
      const confirmed = confirm(
        `Are you sure you want to delete this TV show?`
      );
      if (confirmed) {
        this.shows = this.shows.filter((show) => show.id !== showId);
        alert(`TV Show deleted`);
      }
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

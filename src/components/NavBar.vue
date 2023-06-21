<template>
  <nav>
    <ul>
      <li><router-link to="/showlist">Home</router-link></li>
      <li><router-link to="/showdetails">ShowDetails</router-link></li>
      <li><router-link to="/favorites">Favorites</router-link></li>
      <li><router-link to="/subscriptions">Subscriptions</router-link></li>
      <li><a href="#" @click.prevent="logout">Logout</a></li>
    </ul>
  </nav>
</template>

<script>
export default {
  methods: {
    logout() {
      // Perform logout logic here
      // For simplicity, let's assume successful logout
      // You can replace this with your actual logout logic
      // For example, clearing authentication tokens or session data
      alert(`Logged out successfully!`);
      // Redirect the user to the login page or perform desired actions
    },
  },
};
</script>

<style scoped>
nav {
  background-color: #f2f2f2;
  padding: 10px;
}

ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

li {
  display: inline-block;
  margin-right: 10px;
}

a {
  text-decoration: none;
  color: #333;
}
</style>

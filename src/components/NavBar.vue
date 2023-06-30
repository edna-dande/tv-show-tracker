<template>
  <nav>
    <ul>
      <li><router-link to="/showlist">Home</router-link></li>
      <!-- <li><router-link to="/showdetails">ShowDetails</router-link></li> -->
      <li><router-link to="/favorites">Favorites</router-link></li>
      <li><router-link to="/subscriptions">Subscriptions</router-link></li>
      <li><a href="#" @click.prevent="logout">Logout</a></li>
    </ul>
  </nav>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  methods: {
    ...mapActions(["logoutAction"]),
    logout() {
      this.logoutAction();
      this.$router.push('/');
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

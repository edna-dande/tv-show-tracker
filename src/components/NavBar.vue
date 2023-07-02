<template>
  <!-- <nav class="navbar navbar-expand-lg bg-light">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">TV Show Tracker App</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="#">Home</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Favorites</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Subscriptions</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Logout</a>
          </li>
        </ul>
      </div>
    </div>
  </nav> -->
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

<template>
  <div>
    <!-- Other components and content here -->
    <Login v-if="!isLoggedIn" />
    <Navbar v-if="isLoggedIn" />
    <TVShowList v-if="isLoggedIn" />
    <!-- Display other components or content for authenticated user -->
  </div>
</template>

<script>
import Login from "./components/AdminLogin.vue";
import Navbar from "./components/NavBar.vue";
import TVShowList from "./components/TVShowList.vue";

export default {
  components: {
    Login,
    Navbar,
    TVShowList,
  },
  data() {
    return {
      isLoggedIn: false, // Set to true when user is logged in
    };
  },
};
</script>

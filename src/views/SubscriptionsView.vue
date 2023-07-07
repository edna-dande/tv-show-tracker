<template>
  <div style="color: white;">
    <NavBar />
    <div class="container">
      <h2>Favourites</h2>
      <div v-if="favourites && favourites.length" class="favourites">
        <div v-for="favourite in favourites" :key="favourite.id">
          <p>{{ favourite.title }} <button @click="unfavoriteTvShow(favourite.show_id)" class="btn btn-outline-warning"><font-awesome-icon icon="fa-solid fa-heart" style="color: #c1ef6b;" /> Remove</button></p>
        </div>
      </div>
      <div v-else class="favourites">
        <p>No favourites found.</p>
      </div>
      <h2>Subscriptions</h2>
      <div v-if="subscriptions && subscriptions.length" class="subscriptions">
        <div v-for="subscription in subscriptions" :key="subscription.id">
          <p>{{ subscription.title }} <button @click="unsubscribeShow(subscription.show_id)" class="btn btn-outline-warning"><font-awesome-icon icon="fa-solid fa-xmark" style="color: #ff99c5;" /> Unsubscribe</button></p>
        </div>
      </div>
      <div v-else class="subscriptions">
        <p>No active subscriptions found.</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import NavBar from "../components/NavBar.vue";
import { mapGetters } from "vuex";
export default {
  data () {
    return {
      subscriptions: {},
      favourites: {},
    };
  },
  components: {
    NavBar,
  },
  props: {},
  computed: {
    ...mapGetters(["isLoggedIn", "getToken", "getUser"]),
  },
  created: function () {
    this.getSubscriptions();
    this.getFavourites();
  },
  methods: {
    async getSubscriptions() {
        if (!this.isLoggedIn) {
        this.$router.push('/');
      }
      axios.defaults.headers.common['Authorization'] = `Bearer ${this.getToken}`;
      try {
        const response = await axios.get(`http://localhost:3002/subscriptions?user=${this.getUser.id}`);
        this.subscriptions = response.data;
      } catch (err) {
        console.log(err);
      }
    },
    async getFavourites() {
        if (!this.isLoggedIn) {
        this.$router.push('/');
      }
      axios.defaults.headers.common['Authorization'] = `Bearer ${this.getToken}`;
      try {
        const response = await axios.get(`http://localhost:3002/favourites?user=${this.getUser.id}`);
        this.favourites = response.data;
      } catch (err) {
        console.log(err);
      }
    },
    async unfavoriteTvShow(show_id) {
      if (!this.isLoggedIn) {
        this.$router.push(`/`);
      }
      axios.defaults.headers.common['Authorization'] = `Bearer ${this.getToken}`;
      try {
          await axios.delete(`http://localhost:3002/favourite/${show_id}?user=${this.getUser.id}`);
          this.getFavourites();
      } catch (err) {
        console.log(err);
      }
    },
    async unsubscribeShow(show_id) {
      if (!this.isLoggedIn) {
        this.$router.push(`/`);
      }
      axios.defaults.headers.common['Authorization'] = `Bearer ${this.getToken}`;
      try {
          await axios.delete(`http://localhost:3002/subscribe/${show_id}?user=${this.getUser.id}`);
          this.getSubscriptions();
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  .btn {
    border-radius: 40px;
    margin-right: 10px;
  }
}
ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin-bottom: 5px;
}

button {
  margin-left: 10px;
}
</style>

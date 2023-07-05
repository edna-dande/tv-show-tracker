<template>
  <div>
    <NavBar />
    <h2>Subscriptions</h2>
    <ul v-if="subscriptions">
      <li v-for="subscription in subscriptions" :key="subscription.id">
        {{ subscription.show }} - Expires on {{ subscription.expiryDate }}
        <button @click="unsubscribe(subscription.id)">Unsubscribe</button>
      </li>
    </ul>
    <div v-else>
      <p>No active subscriptions found.</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {},
  computed: {
    ...mapGetters(["isLoggedIn", "getToken", "getUser"]),
  },
  methods: {
    unsubscribe(subscriptionId) {
      // Emit an event to notify the parent component to unsubscribe from the show
      this.$emit(`unsubscribe`, subscriptionId);
    },
  },
};
</script>

<style scoped>
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

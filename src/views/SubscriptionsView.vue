<template>
  <div>
    <NavBar />
    <h2>Subscriptions</h2>
    <ul v-if="ssubscriptions.length">
      <li v-for="subscription in ssubscriptions" :key="subscription.id">
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
  props: {
    subscriptions: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      ssubscriptions: [
        { id: 1, show: `Show 1`, expiryDate: `2023-06-30` },
        { id: 2, show: `Show 2`, expiryDate: `2023-07-15` },
        { id: 3, show: `Show 3`, expiryDate: `2023-07-10` },
      ],
    };
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

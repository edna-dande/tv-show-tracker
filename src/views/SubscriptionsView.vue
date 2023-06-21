<template>
  <div>
    <h2>Subscriptions</h2>
    <ul v-if="subscriptions.length">
      <li v-for="subscription in subscriptions" :key="subscription.id">
        {{ subscription.show }} - Expires on {{ subscription.expiryDate }}
      </li>
    </ul>
    <div v-else>
      <p>No active subscriptions found.</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      subscriptions: [
        { id: 1, show: `Show 1`, expiryDate: `2023-06-30` },
        { id: 2, show: `Show 2`, expiryDate: `2023-07-15` },
        { id: 3, show: `Show 3`, expiryDate: `2023-07-10` },
      ],
    };
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
</style>

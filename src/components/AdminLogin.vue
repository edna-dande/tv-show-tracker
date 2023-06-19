<template>
  <div>
    <h2>Login</h2>
    <form @submit.prevent="login">
      <div>
        <div class="login">
          <label for="username">Username:</label>
          <input type="text" id="username" v-model="username" required. />
        </div>
        <div class="login">
          <label for="password">Password:</label>
          <input type="password" id="password" v-model="password" required />
        </div>
      </div>
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: " ",
      password: " ",
    };
  },
  methods: {
    login() {
      // Perform authentication logic here
      // For simplicity, let's assume successful login
      // You can replace this with your actual authentication logic
      if (this.username === "admin" && this.password === "password") {
        // Successful login, redirect or perform desired actions
        alert(`Login successful!`);
      } else {
        // Failed login, display error message
        alert(`Invalid username or password`);
      }
    },
  },
};
</script>

<style>
.login {
  height: 60px;
  width: 20px;
}
</style>

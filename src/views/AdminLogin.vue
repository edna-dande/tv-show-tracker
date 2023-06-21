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
    <nav>
      <ul>
        <li><router-link to="/showlist">Home</router-link></li>
        <li><router-link to="/showdetails">ShowDetails</router-link></li>
        <li><router-link to="/favorites">Favorites</router-link></li>
        <li><router-link to="/subscriptions">Subscriptions</router-link></li>
        <li><a href="#" @click.prevent="logout">Logout</a></li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      password: "",
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
/* header {
    display: flex;
    border-bottom: 1px solid #ccc;
    padding: 0.5rem 1rem;
  
    p {
      margin-left: 1rem;
    }
  }
  
  nav {
    margin-left: auto;
  
    ul {
      list-style: none;
    }
  
    ul li {
      display: inline-flex;
      margin-left: 1rem;
    }
  } */
</style>

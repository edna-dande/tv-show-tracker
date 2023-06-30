<template>
  <div>
    <div class="row">
      <div class="col-md-6 offset-md-3">
        <h2>Login</h2>
          <div>
            <p v-if="msg">{{ msg }}</p>
            <div class="login form-group">
              <label for="username">Username:</label>
              <input class="form-control" placeholder="Username" type="text" id="username" v-model="username" required />
            </div>
            <div class="login form-group">
              <label for="password">Password:</label>
              <input class="form-control" placeholder="Password" type="password" id="password" v-model="password" required />
            </div>
            <input type="button" @click="login" value="Login" class="button" />
          </div>
        <router-link to="/signup">Sign Up</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import AuthService from '@/services/AuthService.js';
export default {
  data() {
    return {
      username: "",
      password: "",
      msg: "",
    };
  },
  methods: {
    ...mapActions(["loginAction"]),
    async login() {
      try {
        const credentials = {
          username: this.username,
          password: this.password
        };
        const response = await AuthService.login(credentials);
        this.msg = response.msg;
        const token = response.token;
        const user = response.user;
        this.loginAction({token, user});
        // this.$store.dispatch('login', { token, user });
        this.$router.push('/showlist');
      } catch (error) {
        console.log(error);
        this.msg = error.response.data.msg;
      }
    },
    // login() {
    //   // Perform authentication logic here
    //   // For simplicity, let's assume successful login
    //   // You can replace this with your actual authentication logic
    //   if (this.username === "admin" && this.password === "password") {
    //     // Successful login, redirect or perform desired actions
    //     this.$router.push("/showlist");
    //   } else {
    //     // Failed login, display error message
    //     alert(`Invalid username or password`);
    //   }
    // },
  },
};
</script>

<style>
.login {
  height: 60px;
  /* width: 20px; */
}
.button {
  margin-top: 25px;
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

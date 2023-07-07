<template>
    <div>
      <div class="row">
        <div class="col-md-6 offset-md-3 signup-form" style="margin-top: 70px;">
          <h2>Sign Up</h2>
          <p v-if="msg">{{ msg }}</p>
          <div class="login form-group">
            <label for="username">Username:</label>
            <input class="form-control" placeholder="Username" type="text" id="username" v-model="username" required />
          </div>
          <div class="login form-group">
            <label for="username">Password:</label>
            <input class="form-control" placeholder="Password" type="password" id="password" v-model="password" required />
          </div>
          <div class="login form-group">
            <label for="username">Repeat Password:</label>
            <input class="form-control" placeholder="Password (repeat)" type="password" id="password_repeat" v-model="password_repeat" required />
          </div>
          <div class="d-grid gap-2" style='margin-bottom: 10px;'>
            <input type="button" @click="signUp" value="Sign Up" class="btn btn-primary btn-md" style="margin-top: 5%; margin-right:1% ; margin-left: 2%;"  />
          </div>
          <router-link to="/">Login</router-link>
        </div>
      </div>
    </div>
  </template>
  <script>
  import AuthService from '@/services/AuthService.js';
  export default {
    data() {
      return {
        username: '',
        password: '',
        password_repeat: '',
        msg: ''
      };
    },
    methods: {
      async signUp() {
        try {
          const credentials = {
            username: this.username,
            password: this.password,
            password_repeat: this.password_repeat
          };
          const response = await AuthService.signUp(credentials);
          this.msg = response.msg;
          this.$router.push('/');
        } catch (error) {
          this.msg = error.response.data.msg;
        }
      }
    }
  };
  </script>
<style>
.signup-form{
  padding-bottom: 20px;
    background-color: white;
    margin-top: 70px;
    padding-top: 20px;
    border-radius: 12px;
}
</style>
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from 'axios';
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

axios.defaults.headers.common['Authorization'] = `Bearer ${store.state.token}`;

// import Login from "./components/AdminLogin.vue";
// import Navbar from "./components/NavBar.vue";

createApp(App).use(store).use(router).mount("#app");

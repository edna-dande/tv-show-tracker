import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

// import Login from "./components/AdminLogin.vue";
// import Navbar from "./components/NavBar.vue";

createApp(App).use(store).use(router).mount("#app");

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from 'axios';
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
// import { faPlus, faTrash, faPenToSquare, faHear } from '@fortawesome/free-solid-svg-icons'
// import { faPlusSquare, faHeart } from '@fortawesome/free-regular-svg-icons'
// import { faBrands } from '@fortawesome/free-brands-svg-icons'

// import Login from "./components/AdminLogin.vue";
// import Navbar from "./components/NavBar.vue";
// library.add(faPlus, faPlusSquare, faTrash, faPenToSquare, faHeart)
library.add(fab, far, fas)

createApp(App).use(store).use(router).component('font-awesome-icon', FontAwesomeIcon).mount("#app");

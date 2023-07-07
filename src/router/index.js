import { createRouter, createWebHistory } from "vue-router";
// import App from "../views/App.vue";
import SubscriptionsView from "../views/SubscriptionsView.vue";
import AdminLogin from "../views/AdminLogin.vue";
import CreateAdmin from "../views/CreateAdmin.vue";
import AddShow from "../views/AddShow.vue";
import ShowList from "../views/TVShowList.vue";
import ShowDetails from "../views/ShowDetails.vue";
import FavoriteShows from "../views/FavoriteShows.vue";
import EditShows from "../views/EditShows.vue";

const routes = [
  {
    path: "/subscriptions",
    name: "Subscriptions",
    component: SubscriptionsView,
  },
  {
    path: "/showlist",
    name: "ShowList",
    component: ShowList,
  },
  {
    path: "/create",
    name: "Create",
    component: AddShow,
  },
  {
    path: "/showdetails/:id",
    name: "ShowDetails",
    component: ShowDetails,
  },
  {
    path: "/favorites",
    name: "Favorites",
    component: FavoriteShows,
  },
  {
    path: "/",
    name: "Login",
    component: AdminLogin,
  },
  {
    path: "/signup",
    name: "SignUp",
    component: CreateAdmin,
  },
  {
    path: "/edit/:id",
    name: "Edit",
    component: EditShows,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;

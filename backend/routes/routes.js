// import express
import express from "express";

// import functions from controllers
import {
  showTvShows,
  showTvShowById,
  createTvShow,
  updateTvShow,
  deleteTvShow,
} from "../controllers/tvshows.js";
import { showActors } from "../controllers/actors.js";
import { showGenres } from "../controllers/genres.js";
import { signUp, login } from "../controllers/user.js";
import { showSubscriptions, createSubscription, unsubscribe } from "../controllers/subscriptions.js";
import { showFavourites, createFavourite, unfavourite } from "../controllers/favourites.js";

//import functions from middleware
import { validateRegister, isLoggedIn } from "../middleware/users.js";

import multer from "multer";

// init express router
const router = express.Router();
const upload = multer({ dest: '../../public/images' })

// Sign Up
router.post("/sign-up", validateRegister, signUp);

// Login
router.post("/login", login);

// Get All Shows
router.get("/showlist", isLoggedIn, showTvShows);

// Get Single Show
router.get("/show/:id", isLoggedIn, showTvShowById);

// Create New Show
router.post("/tvshows", isLoggedIn, upload.single("image"), createTvShow);

// Update Show
router.put("/show/:id", isLoggedIn, updateTvShow);

// Delete Show
router.delete("/show/:id", isLoggedIn, deleteTvShow);

// Subscriptions
router.get("/subscriptions", isLoggedIn, showSubscriptions);

// Subscribe Show
router.get("/subscribe/:id", isLoggedIn, createSubscription);

// Unsubscribe Show
router.delete("/subscribe/:id", isLoggedIn, unsubscribe);

// Favourites
router.get("/favourites", isLoggedIn, showFavourites);

// Favourite Show
router.get("/favourite/:id", isLoggedIn, createFavourite);

// Unfavourite Show
router.delete("/favourite/:id", isLoggedIn, unfavourite);

// Get All Actors
router.get("/actors", isLoggedIn, showActors);

// Get All Genres
router.get("/genres", isLoggedIn, showGenres);

// export default router
export default router;

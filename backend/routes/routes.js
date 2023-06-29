// import express
import express from "express";
  
// import functions from controllers
import { showTvShows, showTvShowById, createTvShow, updateTvShow, deleteTvShow } from "../controllers/tvshows.js";
import { showActors } from "../controllers/actors.js";
import { showGenres } from "../controllers/genres.js";
import { signUp, login } from "../controllers/user.js";

//import functions from middleware
import { validateRegister, isLoggedIn } from "../middleware/users.js";
  
// init express router
const router = express.Router();

// Sign Up
router.post('/sign-up', validateRegister, signUp);

// Login
router.post('/login', login);
  
// Get All Shows
router.get('/showlist', isLoggedIn, showTvShows);
  
// Get Single Show
router.get('/show/:id', isLoggedIn, showTvShowById);
  
// Create New Show
router.post('/tvshows', isLoggedIn, createTvShow);
  
// Update Show
router.put('/show/:id', updateTvShow);
  
// Delete Show
router.delete('/show/:id', isLoggedIn, deleteTvShow);

// Get All Actors
router.get('/actors', isLoggedIn, showActors);

// Get All Genres
router.get('/genres', isLoggedIn, showGenres);
  
// export default router
export default router;
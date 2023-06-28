// import express
import express from "express";
  
// import functions from controllers
import { showTvShows, showTvShowById, createTvShow, updateTvShow, deleteTvShow } from "../controllers/tvshows.js";
import { showActors } from "../controllers/actors.js";
import { showGenres } from "../controllers/genres.js";
  
// init express router
const router = express.Router();
  
// Get All Shows
router.get('/showlist', showTvShows);
  
// Get Single Show
router.get('/show/:id', showTvShowById);
  
// Create New Show
router.post('/tvshows', createTvShow);
  
// Update Show
router.put('/show/:id', updateTvShow);
  
// Delete Show
router.delete('/show/:id', deleteTvShow);

// Get All Actors
router.get('/actors', showActors);

// Get All Genres
router.get('/genres', showGenres);
  
// export default router
export default router;
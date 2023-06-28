// import express
import express from "express";
  
// import functions from controllers
import { showTvShows, showTvShowById, createTvShow, updateTvShow, deleteTvShow } from "../controllers/tvshows.js";
  
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
  
// export default router
export default router;
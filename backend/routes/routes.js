// import express
import express from "express";
  
// import functions from controllers
import { showTvShows, showTvShowById, createTvShow, updateTvShow, deleteTvShow } from "../controllers/tvshows.js";
  
// init express router
const router = express.Router();
  
// Get All Product
router.get('/showlist', showTvShows);
  
// Get Single Product
router.get('/show/:id', showTvShowById);
  
// Create New Product
router.post('/tvshows', createTvShow);
  
// Update Product
router.put('/show/:id', updateTvShow);
  
// Delete Product
router.delete('/show/:id', deleteTvShow);
  
// export default router
export default router;
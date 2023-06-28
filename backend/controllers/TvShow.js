// Import function from TvShow Model
import { getShows, getShowById, insertShow, updateShowById, deleteShowById } from "../models/showModel.js";
  
// Get All Tv Shows
export const showTvShows = (req, res) => {
    getShows((err, results) => {
        if (err){
            res.send(err);
        }else{
            res.json(results);
        }
    });
}
  
// Get Single Show 
export const showTvShowById = (req, res) => {
    getShowById(req.params.id, (err, results) => {
        if (err){
            res.send(err);
        }else{
            res.json(results);
        }
    });
}
  
// Create New Show
export const createTvShow = (req, res) => {
    const data = req.body;
    insertShow(data, (err, results) => {
        if (err){
            res.send(err);
        }else{
            res.json(results);
        }
    });
}
  
// Update Tv Show
export const updateTvShow = (req, res) => {
    const data  = req.body;
    const id    = req.params.id;
    updateShowById(data, id, (err, results) => {
        if (err){
            res.send(err);
        }else{
            res.json(results);
        }
    });
}
  
// Delete Tv Show
export const deleteTvShow = (req, res) => {
    const id = req.params.id;
    deleteShowById(id, (err, results) => {
        if (err){
            res.send(err);
        }else{
            res.json(results);
        }
    });
}
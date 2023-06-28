// Import functions from Models
import { getShows, getShowById, insertShow, updateShowById, deleteShowById } from "../models/showModel.js";
import { insertActorShow } from "../models/actorModel.js";

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
    console.log("Inserting data:");
    var showdata = {"title": data.name, "genre_id": data.genre_id};
    var castdata = data.cast
    console.log(data);
    console.log(showdata);
    console.log(castdata);
    insertShow(showdata, (err, results) => {
        if (err){
            res.send(err);
        }else{
            var show_id = results.insertId;
            for(var i=0; i<castdata.length;i++) {
                insertActorShow (show_id, castdata[i], (err, results) => {})
            }
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
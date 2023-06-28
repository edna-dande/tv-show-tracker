// Import function from Genre Model
import { getGenres } from "../models/genreModel.js";
  
// Get All Genres
export const showGenres = (req, res) => {
    getGenres((err, results) => {
        if (err){
            res.send(err);
        }else{
            res.json(results);
        }
    });
}
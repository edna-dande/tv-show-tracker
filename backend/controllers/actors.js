// Import function from Actor Model
import { getActors } from "../models/actorModel.js";
  
// Get All Actors
export const showActors = (req, res) => {
    getActors((err, results) => {
        if (err){
            res.send(err);
        }else{
            res.json(results);
        }
    });
}

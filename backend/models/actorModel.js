// import connection
import db from "../config/database.js";
  
// Get All Actors
export const getActors = (result) => {
    db.then((connection) => {
        connection.query("SELECT * FROM actors", (err, results) => {             
            if(err) {
                console.log(err);
                result(err, null);
            } else {
                result(null, results);
            }
        });
    });   
}

// Insert Actor Show to Database
export const insertActorShow = (show_id, actor_id, result) => {
    db.then((connection) => {
        connection.query("INSERT INTO actor_shows (show_id, actor_id) VALUES (?, ?)", [show_id, actor_id], (err, results) => {             
            if(err) {
                console.log(err);
                result(err, null);
            } else {
                result(null, results);
            }
        });
    });   
}
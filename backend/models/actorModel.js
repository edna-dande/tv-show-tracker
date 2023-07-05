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

// Delete Actor Shows from Database
export const deleteActorShows = (show_id, result) => {
    db.then((connection) => {
        connection.query("DELETE FROM actor_shows WHERE id IN (SELECT id FROM actor_shows WHERE show_id = ?)", [show_id], (err, results) => {             
            if(err) {
                console.log(err);
                result(err, null);
            } else {
                result(null, results);
            }
        });
    });   
}
// import connection
import db from "../config/database.js";
  
// Get All Tv Shows
export const getShows = (result) => {
    db.then((connection) => {
        connection.query("SELECT * FROM shows", (err, results) => {             
            if(err) {
                console.log(err);
                result(err, null);
            } else {
                result(null, results);
            }
        });
    });   
}
  
// Get Single Tv Show
export const getShowById = (id, result) => {
    db.then((connection) => {
        connection.query("SELECT * FROM shows WHERE id = ?", [id], (err, results) => {             
            if(err) {
                console.log(err);
                result(err, null);
            } else {
                result(null, results[0]);
            }
        }); 
    });  
}
  
// Insert Show to Database
export const insertShow = (data, result) => {
    db.then((connection) => {
        connection.query("INSERT INTO shows SET ?", [data], (err, results) => {             
            if(err) {
                console.log(err);
                result(err, null);
            } else {
                result(null, results);
            }
        });
    });   
}
  
// Update Show to Database
export const updateShowById = (data, id, result) => {
    db.then((connection) => {
        connection.query("UPDATE shows SET title = ?, genre_id = ? WHERE id = ?", [data.title, data.genre_id, id], (err, results) => {             
            if(err) {
                console.log(err);
                result(err, null);
            } else {
                result(null, results);
            }
        });
    });
}
  
// Delete Show from Database
export const deleteShowById = (id, result) => {
    db.then((connection) => {
        connection.query("DELETE FROM shows WHERE id = ?", [id], (err, results) => {             
            if(err) {
                console.log(err);
                result(err, null);
            } else {
                result(null, results);
            }
        });
    });
       
}
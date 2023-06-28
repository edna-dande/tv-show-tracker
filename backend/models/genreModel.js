// import connection
import db from "../config/database.js";
  
// Get All Genres
export const getGenres = (result) => {
    db.then((connection) => {
        connection.query("SELECT * FROM genres", (err, results) => {             
            if(err) {
                console.log(err);
                result(err, null);
            } else {
                result(null, results);
            }
        });
    });   
}
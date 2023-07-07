// import connection
import db from "../config/database.js";

// Get All User Favourites
export const getFavourites = (user_id, result) => {
  db.then((connection) => {
    connection.query("SELECT *,shows.id as shows_id, favourites.id as id FROM favourites LEFT JOIN shows ON favourites.show_id = shows.id WHERE favourites.user_id = ?", [user_id], (err, results) => {
      if (err) {
        console.log(err);
        result(err, null);
      } else {
        result(null, results);
      }
    });
  });
};

// Insert Favourite to Database
export const insertFavourite = (show_id, user_id, result) => {
  db.then((connection) => {
    connection.query(
      "INSERT INTO favourites (show_id, user_id) VALUES (?, ?)",
      [show_id, user_id],
      (err, results) => {
        if (err) {
          console.log(err);
          result(err, null);
        } else {
          result(null, results);
        }
      }
    );
  });
};

// Delete Favourite from Database
export const deleteFavourite = (show_id, user_id, result) => {
    db.then((connection) => {
        connection.query("DELETE FROM favourites WHERE show_id = ? AND user_id = ?", [show_id, user_id], (err, results) => {             
            if(err) {
                console.log(err);
                result(err, null);
            } else {
                result(null, results);
            }
        });
    });   
}

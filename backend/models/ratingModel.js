// import connection
import db from "../config/database.js";

// Insert Rating to Database
export const insertRating = (data, result) => {
    db.then((connection) => {
      connection.query(
        "INSERT INTO ratings SET ?",
        [data],
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
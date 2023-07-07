// import connection
import db from "../config/database.js";

// Insert Review to Database
export const insertReview = (data, result) => {
    db.then((connection) => {
      connection.query(
        "INSERT INTO reviews SET ?",
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
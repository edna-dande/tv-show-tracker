// import connection
import db from "../config/database.js";

// Get All Tv Shows
export const getShows = (result) => {
  db.then((connection) => {
    connection.query(
      "SELECT *, genres.id as genres_id, shows.id as id FROM shows LEFT JOIN genres ON shows.genre_id = genres.id ORDER BY title ASC",
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

// Get Single Tv Show
export const getShowById = (id, userid, result) => {
  db.then((connection) => {
    connection.query(
      "SELECT *, genres.id as genres_id, shows.id as id FROM shows LEFT JOIN genres ON shows.genre_id = genres.id WHERE shows.id = ?",
      [id],
      (err, results) => {
        if (err) {
          console.log(err);
          result(err, null);
        } else {
          connection.query(
            "SELECT * FROM actors WHERE id IN (SELECT actor_id FROM actor_shows WHERE show_id = ?)",
            [id],
            (err, results1) => {
              var show = results[0];
              if (err) {
                show.cast = {};
                result(null, show);
              } else {
                show.cast = results1;
                connection.query(
                  "SELECT * FROM ratings WHERE show_id = ?",
                  [id],
                  (err, results2) => {
                    if (err) {
                      show.ratings = {};
                      result(null, show);
                    } else {
                      show.ratings = results2;
                      connection.query(
                        "SELECT * FROM reviews WHERE show_id = ?",
                        [id],
                        (err, results3) => {
                          if (err) {
                            console.log(err);
                            show.reviews = {};
                            result(null, show);
                          } else {
                            show.reviews = results3;
                            connection.query(
                              "SELECT * FROM ratings WHERE show_id = ?",
                              [id],
                              (err, results4) => {
                                if (err) {
                                  show.ratings = {};
                                  result(null, show);
                                } else {
                                  show.ratings = results4;
                                  connection.query(
                                    "SELECT COUNT(*) as amount FROM subscriptions WHERE show_id = ? AND user_id = ?",
                                    [id, userid],
                                    (err, results5) => {
                                      if (err) {
                                        console.log(err);
                                        show.subscribed = false;
                                        result(null, show);
                                      } else {
                                        console.log(results5[0].amount);
                                        if (results5[0].amount > 0) {
                                          show.subscribed = true;
                                        } else {
                                          show.subscribed = false;
                                        }
                                        connection.query(
                                          "SELECT COUNT(*) as amount FROM favourites WHERE show_id = ? AND user_id = ?",
                                          [id, userid],
                                          (err, results6) => {
                                            if (err) {
                                              show.favourited = {};
                                              result(null, show);
                                            } else {
                                              if (results6[0].amount > 0) {
                                                show.favourited = true;
                                              } else {
                                                show.favourited = false;
                                              }
                                              result(null, show);
                                            }
                                          }
                                        );
                                      }
                                    }
                                  );
                                }
                              }
                            );
                          }
                        }
                      );
                    }
                  }
                );
              }
            }
          );
        }
      }
    );
  });
};

// Insert Show to Database
export const insertShow = (data, result) => {
  db.then((connection) => {
    connection.query("INSERT INTO shows SET ?", [data], (err, results) => {
      if (err) {
        console.log(err);
        result(err, null);
      } else {
        result(null, results);
      }
    });
  });
};

// Update Show to Database
export const updateShowById = (data, id, result) => {
  db.then((connection) => {
    connection.query(
      "UPDATE shows SET title = ?, genre_id = ?, image = ? WHERE id = ?",
      [data.title, data.genre_id, data.image, id],
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

// Delete Show from Database
export const deleteShowById = (id, result) => {
  db.then((connection) => {
    connection.query("DELETE FROM shows WHERE id = ?", [id], (err, results) => {
      if (err) {
        console.log(err);
        result(err, null);
      } else {
        result(null, results);
      }
    });
  });
};

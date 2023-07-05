// import connection
import db from "../config/database.js";
  
// Get All Subscriptions
export const getSubscriptions = (user_id, result) => {
    db.then((connection) => {
        connection.query("SELECT * FROM subscriptions WHERE user_id = ?", [user_id], (err, results) => {             
            if(err) {
                console.log(err);
                result(err, null);
            } else {
                result(null, results);
            }
        });
    });   
}

// Insert Subscription to Database
export const insertSubscription = (show_id, user_id, result) => {
    db.then((connection) => {
        connection.query("INSERT INTO subscriptions (show_id, user_id) VALUES (?, ?)", [show_id, user_id], (err, results) => {             
            if(err) {
                console.log(err);
                result(err, null);
            } else {
                result(null, results);
            }
        });
    });   
}

// Delete Subscription from Database
export const deleteSubscription = (show_id, user_id, result) => {
    db.then((connection) => {
        connection.query("DELETE FROM subscriptions WHERE show_id = ? AND user_id = ?", [show_id, user_id], (err, results) => {             
            if(err) {
                console.log(err);
                result(err, null);
            } else {
                result(null, results);
            }
        });
    });   
}
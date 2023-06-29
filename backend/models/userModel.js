// import connection
import db from "../config/database.js";
import bcrypt from "bcryptjs";
import uuid from "uuid";

// Get All Users
export const getUsers = (result) => {
    db.then((connection) => {
        connection.query("SELECT * FROM users", (err, results) => {             
            if(err) {
                console.log(err);
                result(err, null);
            } else {
                result(null, results);
            }
        });
    });   
}

// Sign Up
export const signUpUser = (username, password, result) => {
    db.then((connection) => {
        connection.query(`SELECT * FROM users WHERE LOWER(username) = LOWER(${db.escape(username)});`,(err, results) => {
            if (err){
                result(err, null)
            } else if (results.length) {
                result("Existing", null)
            } else {
                // username is available
                bcrypt.hash(password, 10, (err, hash) => {
                    if (err) {
                        result(err, null);
                    } else {
                        // has hashed pw => add to database
                        db.then((connection) => {
                            connection.query(`INSERT INTO users (id, username, password, registered) VALUES ('${uuid.v4()}', ${db.escape(username)}, ${db.escape(hash)}, now())`, (err, results1) => {
                                if (err) {
                                    result(err, null);
                                } else {
                                    result(null, results1);
                                }
                            });
                        })
                    }
                })
            }
        });
    });
}

// Login
export const loginUser = (username, password, result) => {
    db.then((connection) => {
        connection.query(`SELECT * FROM users WHERE username = ${db.escape(username)};`, (err, results) => {
            // user does not exists
            if (err) {
                result(err, null);
            } else if (!result.length) {
                result("Incorrect", null);
            } else {
                // check password
                bcrypt.compare(password, results[0]['password'], (bErr, bResult) => {
                    if (bErr) {
                        result("Incorrect", null);
                    } else {
                        if (bResult) {
                            db.then((connection) => {
                                connection.query(`UPDATE users SET updated_at = now() WHERE id = '${results[0].id}'`)
                            })
                            result(null, results);
                        }
                    }
                })
            }
        })
    });
}
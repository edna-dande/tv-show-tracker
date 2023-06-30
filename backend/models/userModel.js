// import connection
import db from "../config/database.js";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";

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
        connection.query(`SELECT * FROM users WHERE LOWER(name) = LOWER(${connection.escape(username)});`,(err, results) => {
            if (err){
                console.log(err);
                result(err, null)
            } else if (results.length) {
                result("Existing", null)
            } else {
                // username is available
                bcrypt.hash(password, 10, (err, hash) => {
                    if (err) {
                        console.log(err);
                        result(err, null);
                    } else {
                        // has hashed pw => add to database
                        db.then((connection) => {
                            connection.query(`INSERT INTO users (session_id, name, password, created_at) VALUES ('${uuidv4()}', ${connection.escape(username)}, ${connection.escape(hash)}, now())`, (err, results1) => {
                                if (err) {
                                    console.log(err);
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
        connection.query(`SELECT * FROM users WHERE name = ${connection.escape(username)};`, (err, results) => {
            // user does not exists
            if (err) {
                console.log(err);
                result(err, null);
            } else if (!result.length) {
                result("Incorrect", null);
            } else {
                // check password
                bcrypt.compare(password, results[0]['password'], (bErr, bResult) => {
                    if (bErr) {
                        console.log(bErr);
                        result("Incorrect", null);
                    } else {
                        if (bResult) {
                            db.then((connection) => {
                                connection.query(`UPDATE users SET updated_at = now(), session_id = '${uuidv4()}' WHERE id = '${results[0].id}'`)
                            })
                            result(null, results);
                        }
                    }
                })
            }
        })
    });
}
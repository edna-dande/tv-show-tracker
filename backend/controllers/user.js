import jwt from "jsonwebtoken";

// Import function from User Model
import { getUsers, signUpUser, loginUser } from "../models/userModel.js";

// Get All Users
export const showUsers = (req, res) => {
    getUsers((err, results) => {
        if (err){
            res.send(err);
        }else{
            res.json(results);
        }
    });
}

// Sign Up
export const signUp = (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
    signUpUser(username, password, (err, results) => {
        if (err) {
            if (err === "Existing") {
                res.status(409).send({
                    msg: 'This username is already in use!'
                });
            } else {
                res.status(500).send({
                    msg: err
                });
            }
        } else {
            res.status(201).send({
                msg: 'Registered!'
            });
        }
    });
}

// Login
export const login = (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
    loginUser(username, password, (err, results) => {
        if (err) {
            if (err === "Incorrect") {
                res.status(401).send({
                    msg: 'Username or password is incorrect!'
                });
            } else {
                res.status(500).send({
                    msg: err
                });
            }
        } else {
            const token = jwt.sign({
                username: results[0].username,
                userId: results[0].id
              },
              'SECRETKEY', {
                expiresIn: '7d'
              }
            );
            res.status(200).send({
                msg: 'Logged in!',
                token,
                user: results[0]
            });
        }
    })

}

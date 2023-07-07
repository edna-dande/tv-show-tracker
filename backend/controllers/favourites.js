import { getFavourites, insertFavourite, deleteFavourite } from "../models/favouriteModel.js"

// Get All Subscriptions
export const showFavourites = (req, res) => {
    getFavourites(req.query.user, (err, results) => {
      if (err) {
        res.send(err);
      } else {
        res.json(results);
      }
    });
};

// Create Subscription
export const createFavourite = (req, res) => {
    insertFavourite(req.params.id, req.query.user, (err, results) => {
        if (err) {
            res.send(err);
        } else {
            res.json(results);
        }
    })
};

// Delete Subscription
export const unfavourite = (req, res) => {
    deleteFavourite(req.params.id, req.query.user, (err, results) => {
        if (err) {
            res.send(err);
        } else {
            res.json(results);
        }
    })
};
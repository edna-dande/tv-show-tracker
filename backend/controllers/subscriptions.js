import { getSubscriptions, insertSubscription, deleteSubscription } from "../models/subscriptionModel.js";

// Get All Subscriptions
export const showSubscriptions = (req, res) => {
    getSubscriptions(req.params.id, (err, results) => {
      if (err) {
        res.send(err);
      } else {
        res.json(results);
      }
    });
};

// Create Subscription
export const createSubscription = (req, res) => {
    insertSubscription(req.params.id, req.query.user, (err, results) => {
        if (err) {
            res.send(err);
        } else {
            res.json(results);
        }
    })
};

// Delete Subscription
export const unsubscribe = (req, res) => {
    deleteSubscription(req.params.id, req.query.user, (err, results) => {
        if (err) {
            res.send(err);
        } else {
            res.json(results);
        }
    })
};
import { insertRating } from "../models/ratingModel.js";

// Create Review
export const createRating = (req, res) => {
    const data = req.body;
    var ratedata = {
        show_id: data.id,
        user_id: data.user,
        value: data.rating,
      };
    insertRating(ratedata, (err, results) => {
        if (err) {
            res.send(err);
        } else {
            res.json(results);
        }
    })
};
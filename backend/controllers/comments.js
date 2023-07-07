import { insertReview } from "../models/commentModel.js";

// Create Review
export const createReview = (req, res) => {
    const data = req.body;
    var reviewdata = {
        show_id: data.id,
        user_id: data.user,
        content: data.comment,
      };
    insertReview(reviewdata, (err, results) => {
        if (err) {
            res.send(err);
        } else {
            res.json(results);
        }
    })
};
// Import functions from Models
import {
  getShows,
  getShowById,
  insertShow,
  updateShowById,
  deleteShowById
} from "../models/showModel.js";
import { insertActorShow, deleteActorShows } from "../models/actorModel.js";

// Get All Tv Shows
export const showTvShows = (req, res) => {
  getShows((err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.json(results);
    }
  });
};

// Get Single Show
export const showTvShowById = (req, res) => {
  getShowById(req.params.id, req.query.user, (err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.json(results);
    }
  });
};

// Create New Show
export const createTvShow = (req, res) => {
  const data = req.body;
  var showdata = {
    title: data.name,
    genre_id: data.genre_id,
    image: "/images/" + req.file.filename,
  };
  var castdata = data.cast;
  console.log(data);
  insertShow(showdata, (err, results) => {
    if (err) {
      res.send(err);
    } else {
      var show_id = results.insertId;
      for (var i = 0; i < castdata.length; i++) {
        insertActorShow(show_id, castdata[i], (err, results) => {});
      }
      res.json(results);
    }
  });
};

// Update Tv Show
export const updateTvShow = (req, res) => {
  const data = req.body;
  const id = req.params.id;
  var showdata = {
    title: data.name,
    genre_id: data.genre_id,
    image: "/images/" + req.file.filename,
  };
  var castdata = data.cast;
  updateShowById(showdata, id, (err, results) => {
    if (err) {
      res.send(err);
    } else {
      deleteActorShows(id, (err, results) => {});
      for (var i = 0; i < castdata.length; i++) {
        insertActorShow(id, castdata[i], (err, results) => {});
      }
      res.json(results);
    }
  });
};

// Delete Tv Show
export const deleteTvShow = (req, res) => {
  const id = req.params.id;
  deleteShowById(id, (err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.json(results);
    }
  });
};

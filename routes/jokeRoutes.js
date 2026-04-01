"use strict";
const express = require("express");
const router = express.Router();
const jokeController = require('../controller/jokeController');

router.get("/jokebook/categories", jokeController.fetchCategories);
router.get("/jokebook/category/:category", jokeController.fetchJokeByCategory);
router.get("/jokebook/random", jokeController.fetchRandomJoke);
router.post("/jokebook/joke/add", jokeController.createJoke);

module.exports = router;
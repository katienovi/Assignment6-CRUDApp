/*
Name: Katie Williams
Date: 4.2.2026
CSC 372-01

This is the joke routes page for my CRUD app. It contains all of the routes the api will use.
*/
"use strict";
const express = require("express");
const router = express.Router();
const jokeController = require('../controller/jokeController');

//All jokebook endpoints
router.get("/jokebook/categories", jokeController.fetchCategories);
router.get("/jokebook/category/:category", jokeController.fetchJokeByCategory);
router.get("/jokebook/random", jokeController.fetchRandomJoke);
router.post("/jokebook/joke/add", jokeController.createJoke);

module.exports = router;
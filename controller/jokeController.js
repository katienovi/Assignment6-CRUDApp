"use strict";
const model = require('../model/jokeModel');

async function fetchCategories(req, res) {
    try {
        const categories = await model.getCategories();
        res.render("joke-categories", {title: "All categories", categories: categories});
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
}

async function fetchJokeByCategory(req, res) {
    const category = req.params.category;
    const limit = req.query.limit;
        try {
            const jokes = await model.getJokesByCategory(category, limit);

            if (!jokes){
                return res.status(404).send("Joke not found or your category does not exist.");
            }
            
            //res.json(jokes)
            res.render("joke-details", {title: "Joke by Category", jokesList: jokes});

        } catch (err) {
            console.error(err);
            res.status(500).send("Server error");
        }
    } 



async function fetchRandomJoke(req, res) {
    try {
        const joke = await model.getRandomJoke();
        //res.json(joke);
        res.render("landing", { title: "Random Joke", joke });
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
}



async function createJoke(req, res) {
    const { category, setup, delivery} = req.body;
    if (category && setup && delivery) {
        try {
            const newJoke = await model.addJoke(category, setup, delivery);
            res.status(201).json(newJoke);
            //res.render("joke-form");
        } catch (err) {
            console.error(err);
            res.status(500).send("Server error");
        }
    } else {
        res.status(400).send("Missing required joke fields!");
    }
}

module.exports = {
    fetchCategories,
    fetchJokeByCategory,
    fetchRandomJoke,
    createJoke
};


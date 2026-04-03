/*
Name: Katie Williams
Date: 4.2.2026
CSC 372-01

This is the joke controller page for my CRUD app. It contains the controller methods for all of my endpoints, including:
fetching all categories, fetching all jokes in a specific category, fetching a random joke, posting a new joke.
*/
"use strict";
const model = require('../model/jokeModel');

//Async function to fetch all of the available joke categories. 
//Renders a page called "joke-categories", which is an ejs file to display all categories.
async function fetchCategories(req, res) {
    try {
        const categories = await model.getCategories();
        res.render("joke-categories", {title: "All categories", categories: categories});
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
}

//Async function to fetch all jokes belonging to a certain category
//Renders a page called "joke-details", which is an ejs file to display all the jokes.
async function fetchJokeByCategory(req, res) {
    const category = req.params.category;
    const limit = req.query.limit;
        try {
            const jokes = await model.getJokesByCategory(category, limit);

            //Checks if there aren't any jokes/we cant find the category the user is looking for 
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


//Async function to get a random joke from our database.
//Renders a page called landing (our default page) that displays a random joke from the databse.
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


//Async function to post a new joke.
//Requires a category, setup, and delivery. Displays an appropriate error message if not included.
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

//Exporting our modules
module.exports = {
    fetchCategories,
    fetchJokeByCategory,
    fetchRandomJoke,
    createJoke
};


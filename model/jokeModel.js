/*
Name: Katie Williams
Date: 4.2.2026
CSC 372-01

This is the joke model page for my CRUD app. It contains the model function for all of my endpoints, including:
getting all DISTINCT (unique) categories from the jokes table, getting all jokes in a specific category with an optional limit,
getting a single random joke, and adding a new joke w/ 3 required params.
*/
"use strict";
const pool = require('./dbConnection');

//Async function to select all unique/distinct categories from our joke database, returns the results.
async function getCategories() {
    const queryText = "SELECT DISTINCT category FROM jokes";
  
    const result = await pool.query(queryText);
    return result.rows;
}

//Async function to get jokes by a certain category, with an optional limit.
async function getJokesByCategory(category, limit) {
    let queryText = "SELECT * FROM jokes where category= $1";
    let values = [category];

    //If we do have a limit, adds it to our query.
    if (limit) {
        queryText += " LIMIT $2";
        values.push(limit);
    }

    const result = await pool.query(queryText, values);
    return result.rows;
}

//Async function to get a random joke.
//Using RANDOM() to select randomly, limiting to only one random joke.
async function getRandomJoke(){
    const queryText = "SELECT * FROM jokes ORDER BY RANDOM() LIMIT 1";

    const result = await pool.query(queryText);
    return result.rows[0];
}

//Async function to add a new joke.
//Requires 3 parameters -> category, setup, delivery
async function addJoke(category, setup, delivery) {
    let queryText = "INSERT INTO jokes (category, setup, delivery) VALUES ($1, $2, $3) RETURNING *";
    let values = [category, setup, delivery];
    
    const result = await pool.query(queryText, values);
    return result.rows[0];
}

//Exporting modules
module.exports = {
    getCategories,
    getJokesByCategory,
    getRandomJoke,
    addJoke
};
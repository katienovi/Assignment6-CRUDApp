/*
Name: Katie Williams
Date: 4.2.2026
CSC 372-01

This is the script.js page for my CRUD app. It contains a function that automatically starts when the page loads for the main functionality,
a function to get results from the pages search bar, functionality for the new joke form to appear and close, functions to get class names and ids,
and a function to submit the new joke form.
*/
"use strict";

(function () {

    //Adding an event listener for as soon as the page loads.
    window.addEventListener("load", init);
    function init() {

        //Getting the search bar and submit button
        let searchButton = id('button');
        let searchBar = id('searchbar');
        //Creating an event listener for when the submit button is clicked, getting the content, and going to the appropriate endpoint.
        searchButton.addEventListener("click", function() {
            let categoryName = searchBar.value;
            window.location.href = `/jokebook/category/${categoryName}`;
        })

        //Button for creating a new joke -> displays the form
        let newButton = id("new-joke-btn");
        newButton.addEventListener("click", function () {
            id("form-popup").style.display = "block";
        });

        //Button for saving a new joke
        let saveButton = id("save-joke");
        saveButton.addEventListener("click", function (e) {
            e.preventDefault();
            submitForm();
        });

        //Button for closing the new joke form
        let closeButton = id("cancel-btn");
        closeButton.addEventListener("click", function (e) {
            id("form-container").reset();
            id("form-popup").style.display = "none";
        });

        

    }

    //Function to submit the new joke form. Stringifies the data and uses a fetch request to the /jokebook/joke/add endpoint
    function submitForm() {
        let params = new FormData(id("form-container")); // pass in entire form tag
        let jsonBody = JSON.stringify(Object.fromEntries(params)); //make form data json string.
        fetch("/jokebook/joke/add", {
            method: "POST",
            headers: {
                Accept: "application/json, text/plain, */*",
                "Content-Type": "application/json",
            },
            body: jsonBody,
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
            })
            .then((newJoke) => {
                window.location.href = `/jokebook/category/${newJoke.category}`;
            })
            .catch(alert);
    }


    function id(idName) {
        return document.getElementById(idName);
    }

    function qsa(className) {
        return document.querySelectorAll(className);
    }

})();
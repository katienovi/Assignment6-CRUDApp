"use strict";

(function () {

    window.addEventListener("load", init);
    function init() {

        let searchButton = id('button');
        let searchBar = id('searchbar');
        searchButton.addEventListener("click", function() {
            let categoryName = searchBar.value;
            window.location.href = `/jokebook/category/${categoryName}`;
        })

        let newButton = id("new-joke-btn");
        newButton.addEventListener("click", function () {
            id("form-popup").style.display = "block";
        });

        let saveButton = id("save-joke");
        saveButton.addEventListener("click", function (e) {
            e.preventDefault();
            submitForm();
        });

        let closeButton = id("cancel-btn");
        closeButton.addEventListener("click", function (e) {
            id("form-container").reset();
            id("form-popup").style.display = "none";
        });

        

    }

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
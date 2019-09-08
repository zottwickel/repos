'use strict';

function addResults(responseJson) {
    $('.results').empty();
    for (let i = 0; i < responseJson.length; i++) {
        $('.results').append(
            `
                <p>###################################################</p><br>
                <p class="result">Name: ${responseJson[i].name}</p>
                <p class="result">URL: <a target="_blank" href="${responseJson[i].html_url}">${responseJson[i].html_url}</a></p>
                <br>
            `
        )
    }
}

function getRepos(user) {
    const url = `https://api.github.com/users/${user}/repos`;
    fetch(url)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(response.status);
        })
        .then(responseJson => {
            addResults(responseJson);
        })
        .catch(error => {
            alert(`Something went wrong: ${error.message}`);
        });
}

function watchForm() {
    $('form').on('submit', function(event) {
        event.preventDefault();
        const user = $('.text').val();
        getRepos(user);
    })
}

function init() {
    $('body').append(
        `
            <h1>Input username for repos</h1>
            <form id="form">
                <input class="text" for="form" type="text" value="zottwickel" required>
                <input for="form" type="submit" value="Go!">
            </form>
            <section class="results">
            </section>
        `
    );
}

$(function() {
    init();
    watchForm();
})
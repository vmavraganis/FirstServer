const express = require('express');
const hbs = require('hbs');
const path = require('path');

var app = express();

app.set('view engine', 'hbs');
app.use(express.static(__dirname + "/public"));

app.get('/', (request, response) => {
    response.render('home.hbs',
        {
            user: process.env['USERPROFILE'].split(path.sep)[2],
            pageTitle: "Home Page",
            message:function() {return `Welcome to my website ${this.user}`;},
            currentYear: new Date().getFullYear()
        });
});
app.get('/about', (request, response) => {
    response.render('about.hbs',
        {
            title: "About page",
            currentYear: new Date().getFullYear()
        });
})
app.get('/bad', (request, response) => {
    response.send({
        errorMessage: "Bad Getway"
    });
})



app.listen(3000, () => {
    console.log("App is up on port 3000");
});
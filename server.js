const express = require('express');
const hbs = require('hbs');
const path = require('path');

var app = express(); 

hbs.registerPartials(`${__dirname}/views/partials`);
hbs.registerHelper('getCurrentYear',()=>{
    return new Date().getFullYear();
})
app.set('view engine', 'hbs');
app.use(express.static(`${__dirname}/public`));

app.get('/', (request, response) => {
    response.render('home.hbs',
        {
            user: process.env['USERPROFILE'].split(path.sep)[2],
            pageTitle: "Home Page",
            message: function () { return `Welcome to my website ${this.user}`; },
            
        });
});
app.get('/about', (request, response) => {
    response.render('about.hbs',
        {
            pageTitle: "About page",
            message:"Where to we go from here futureeeee wooooorld"
        });
})

app.get('/help', (request, response) => {
    response.render('help.hbs', {

       pageTitle: "Help page",
        message:"We are here to help you"
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
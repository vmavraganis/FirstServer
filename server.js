/*jslint esversion: 6 */
const express = require("express");
const hbs = require("hbs");
const path = require("path");
const fs = require("fs");
var app = express();

hbs.registerPartials(`${__dirname}/views/partials`);
app.set("view engine", "hbs");

app.use((req,res,next)=>{
    var now=new Date().toString();
    let log=`${now} :${req.method} : ${req.url}`;
    console.log(log);
    fs.appendFile("server.log",log+"\n",(err)=>{
        if(err){
        console.log('Unable to append to server.log')}
    });
    next();
});

// app.use ((req,res,next)=>{
//     res.render("maintenance.hbs");
// });

app.use(express.static(`${__dirname}/public`));

hbs.registerHelper('getCurrentYear',()=>{
    return new Date().getFullYear();
});
hbs.registerHelper('screamIt', (text) => {
 return text.toUpperCase();
});






app.get('/', (request, response) => {
    response.render('home.hbs',
        {
            user: process.env['USERPROFILE'].split(path.sep)[2],
            pageTitle: "Home Page",
            message:"welcome to my site"
            //message: function () { return `Welcome to my website ${this.user}`; },
        
        });
});
app.get('/about', (request, response) => {
    response.render('about.hbs', 
        {
            pageTitle: "About pageeeeeee",
            message:"Where to we go from here futureeeee wooooorld"
        });
});
  
app.get('/projects', (request, response) => {
    response.render('about.hbs', 
        {
            pageTitle: "Project page",
            message:"Here are my Projects"
        });
});

app.get('/help', (request, response) => {
    response.render('help.hbs', {

       pageTitle: "Help page",
        message:"We are here to help you"
    });
});
app.get('/bad', (request, response) => {
    response.send({
        errorMessage: "Bad Getway"
    });
});



app.listen(3000, () => {
    console.log("App is up on port 3000");
});
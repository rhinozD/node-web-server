const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if(err){
            console.log('Unable to append to server.log');
        }
    });
    next();
});

// app.use((req, res, next) => {
//     res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamOut', (text) => {
    return text.toUpperCase();
});

app.get('/', (req, res) => {
   res.render('home.hbs', {
       pageTitle: 'Home page',
       home: 'Welcome'
   });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page',
        about: 'A newbie who learning Node js and Express'
    });
});

app.get('/profile', (req, res) => {
    res.render('profile.hbs', {
        pageTitle: 'My Profile',
        name: "Hades10",
        describe: "a newbie of Node"
    });
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 400
    });
});

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});
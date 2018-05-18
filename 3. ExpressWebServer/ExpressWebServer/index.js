const hbs = require('hbs');
const express = require('express');
var app = express();


app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.send({
        name: 'Shreyas Parbat',
        likes: [
            'This',
            'and',
            'that'
        ]
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs');
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Unable to handle request'
    });
});

app.listen(3000);
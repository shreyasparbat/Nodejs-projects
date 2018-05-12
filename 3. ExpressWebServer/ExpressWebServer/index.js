const express = require('express');

var app = express();

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

app.listen(3000);
// Library imports
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

// Custom imports
const {mongoose} = require('./db/mongoose');
const {Todo} = require('./models/todo');
const {User} = require('./models/user');

// Init express app
const app = express();

// Add middleware: body-parser
app.use(bodyParser.json());

// POST: create new to-do
app.post('/todos', (req, res) => {
    // Create to-do
    const todo = new Todo({
        text: req.body.text
    });

    // Save it
    todo.save().then((doc) => {
        res.status(200).send(doc);
    }, (e) => {
        res.status(400).send(e);
    });
});

//GET: all to-dos
app.get('/todos', (req, res) => {
    Todo.find().then((collection) => {
        res.send({
            todos: collection,
            code: 'A custom status code'
        });
    }, (e) => {
        res.status(400).send(e);
    });
});

//GET: an individual to-do (custom url)
app.get('/todos/:id', (req, res) => {
   let id = req.params.id;

   // Validate ID
    if (!ObjectID.isValid(id)) {
        res.status(404).send(); //using 404 and not 400 cause this endpoint has a custom url, dependent on the id passed in. So, url not found => ID not found
    } else {
        // Read for to-do
        Todo.findById(id).then((todo) => {
            // Check if to-do was found
            if (todo) {
                res.send({todo});
            } else {
                res.status(404).send()
            }
        }, (e) => {
            res.status(400).send('No todo found')
        });
    }
});

// Start server
app.listen(3000, () => {
    console.log('Started on port 3000...')
});
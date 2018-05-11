// Importing (npm)
const fs = require('fs'); //File Stream
const _ = require('lodash');

var title = { //created a seperate object to keep the code dry
    describe: 'Title of note',
    demand: true, //to make 'title' argument compulsary
    alias: 't' //now it can be run as '-t' instead of '--title'
};
const yargs = require('yargs')
    .command('add', 'Add a new Note', {
        title,
        body: {
            describe: 'Body of note',
            demand: true, 
            alias: 'b'
        }
    })
    .command('list', 'List all notes')
    .command('read', 'Read a note', { title })
    .command('remove', 'Remove a note')
    .help()
    .argv; 

// Importing custom modules
const notes = require('./notes.js');

// Helper function: Print note
var printNote = (title, body) => {
    console.log(`------------`);
    console.log(`Title: "${title}"`);
    console.log(`Body: "${body}"`);
};

// Getting arguments
var command = yargs._[0];
var title = yargs.title;
var body = yargs.body;

// Executing correct command
if (command === 'add') {
    if (notes.addNote(title, body)) {
        console.log(`Note created`);
        printNote(title, body);
    } else {
        console.log(`Note with title "${title}" already exists!`);
    }
} else if (command === 'list') {
    var allNotes = notes.getList();
    if (allNotes.length !== 0) {
        console.log(`Notes: -`);
        allNotes.forEach(note => printNote(note.title, note.body));
    } else {
        console.log(`File empty`);
    }
} else if (command === 'remove') {
    notes.remove(title) ? console.log(`Note removed`) : console.log(`Note with title "${title}" doesn't exist`);
} else if (command === 'read') {
    var note = notes.read(title)[0];
    if (note) {
        console.log(`Note found`);
        printNote(note.title, note.body);
    } else {
        console.log(`Note not found`);
    }
} else {
    console.log(`Command "${command}" not recognised`)
}
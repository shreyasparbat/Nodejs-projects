// Importing (npm)
const fs = require('fs');

// Helper fucntion: Get existing notes
var fetchNotes = () => {
    try {
        var notesString = fs.readFileSync('notes.json');
        return JSON.parse(notesString);
    } catch (error) {
        return [];
    }
};

// Helper function: Save notes
var saveNotes = (notes) => {
    fs.writeFileSync('notes.json', JSON.stringify(notes));
};

// Adding a new note
var addNote = (title, body) => {
    var notes = fetchNotes();
    var note = {
        title,
        body
    };

    // Check if title already exists
    var duplicateTitleNotes = notes.filter((recordedNote) => recordedNote.title === note.title);
    if (duplicateTitleNotes.length === 0) {
        notes.push(note);
        saveNotes(notes);
        return notes
    }

    //javasript returns 'undefined' by default
};

// Getting a list of all existing notes
var getList = () => {
    return fetchNotes();
};

// Returning a note with a specific title
var read = (title) => {
    var notes = fetchNotes();
    return notes.filter( note => {
        if (note.title === title) {
            return note;
        }
    });
};

// Removing the note with the specified title
var remove = (title) => {
    var notes = fetchNotes();
    var filteredNotes = notes.filter((note) => note.title !== title );
    saveNotes(filteredNotes);
    return filteredNotes.length < notes.length;
};

module.exports = {
    addNote, //same as writing addNote: addNote
    getList,
    read,
    remove
};
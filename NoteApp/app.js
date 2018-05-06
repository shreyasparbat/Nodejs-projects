// Importing
const fs = require('fs'); //import the File Stream module
const os = require('os'); //importing the OS module
const notes = require('./notes.js'); //importing your own file
const _ = require('lodash');//importing npm module

// Get user info
var user = os.userInfo();

// Check if given value is a string
console.log(_.isString('Jello Yhere'));

// Remove duplicates from an array
console.log(_.uniq(['Hello', 1, 'Hello']));

// The call back function is called only when an error occurs
fs.appendFile('greetings.txt', `Hello, ${user.username}, you have started ${notes.addNotes}`, (err) => {
    if (err) {
        console.log('Error occured, cannot append to file');
    }
});
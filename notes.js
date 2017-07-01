const fs = require('fs');
const os = require('os');

function fetchNotes(){
    try{
        var notesString = fs.readFileSync('notes-data.json');
        return JSON.parse(notesString);
    }
    catch(err){
        return [];
    }
    
};

function saveNotes(notes){
    fs.writeFileSync('notes-data.json',JSON.stringify(notes));
};

var addNote = function(title,body){
    var notes = fetchNotes();
    var note = {
        title : title,
        body : body
    }
    
    var duplicateNotes = notes.filter(function(note){
        return note.title === title;
    });

    if(duplicateNotes.length === 0)
    {
        notes.push(note);
        saveNotes(notes);
        return note;
    }
    return null;
}

var getAll = function(){
    allNotes = fetchNotes();
    return allNotes;
}

var getNote = function(title){
    var findNotes = fetchNotes();
    return findNotes.filter(function(note){
        return note.title === title;
    })[0];
}

var removeNote = function(title){
    var filterNotes = fetchNotes();
    var updatedNotes = filterNotes.filter(function(note){
        return note.title !== title;
    });
    saveNotes(updatedNotes);

    return filterNotes.length !== updatedNotes.length;
}

module.exports = {
    addNote,
    getAll,
    getNote,
    removeNote
}
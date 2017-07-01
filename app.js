console.log('Startin app.js');

const _ = require('lodash');
const fs = require('fs');
const yargs = require('yargs');

const notes = require('./notes');

const titleOptions = {
            describe : 'Title of Note',
            demand : true,
            alias : 't'
        };
const bodyOptions = {
            describe : 'Body of Note',
            demand : true,
            alias : 'b'
        };

var argv = yargs
    .command('add','Add new note',{
        title : titleOptions,
        body : bodyOptions       
    })
    .command('list','List all notes')
    .command('read','Read a note',{
        title : titleOptions
    })
    .command('remove','Remove a note',{
        title : titleOptions
    })
    .help()
    .argv;
var command = argv._[0];


switch (command) {
    case 'add':
        console.log("Adding note");
        var note = notes.addNote(argv.title,argv.body);
        if(note){
            console.log('Note created : '+note.title,note.body);
        }
        else{
            console.log('Duplicate note found');
        }
        break;

    case 'remove':
        console.log("Delete note");
        var remvbool = notes.removeNote(argv.title);
        var msg = remvbool ? 'note removed' : 'No such note found';
        console.log(msg);
        break;

    case 'list':
        console.log("Listing notes");
        var allNotes = notes.getAll();
        allNotes.forEach(function(note) {
            console.log("Note: title:"+note.title+" body:"+note.body+"\n")
        }, this);
        break;
    
    case 'read':
        console.log('Reading note');
        var noteGot = notes.getNote(argv.title);
        var msg = noteGot ? "Note: title:"+noteGot.title+" body:"+noteGot.body : "No such note found";
        console.log(msg);
        break;

    default:
        console.log("No such command");
        break;
}
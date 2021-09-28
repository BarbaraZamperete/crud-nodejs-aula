const { Schema, model } = require('mongoose');

const NotesSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        require: true
    },
    user: {
        type: String,
        require: true
    }
}, {
    timestamps: true //create_at modify_at
});

module.exports = model('Note', NotesSchema); //nome da coleção e schema
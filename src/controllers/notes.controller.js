const notesCtrl = {};

const Note = require('../models/Notes');

notesCtrl.renderNoteForm = (req, res) => {
    // res.send('Notes Add');
    res.render('notes/new-note')
};

notesCtrl.createNewNote = async (req, res) => {
    // res.send('Create new note');
    const { title, description } = req.body; //pega do body da requisição o titulo e a descrição

    const newNote = new Note({title: title, description: description}); //cirei um documento do tipo Note
    newNote.user = req.user.id; //salva o usuario que criou ela
    await newNote.save(); //salva esse documento no banco, vai esperar o retorno dessa função para continuar o codigo
    // res.send('Sucesso!');
    req.flash('success_msg', 'Note Added Successfully');
    res.redirect('/notes');
};

notesCtrl.renderNotes = async(req, res) => {
    // res.send('Render notes');
    // console.log(req.user);
    const notes = await Note.find({user: req.user.id});
    res.render('notes/all-notes', {notes});
};

notesCtrl.renderEditForm = async(req, res) => {
    const note = await Note.findById(req.params.id);
    // res.send('Render Edit Form');
    res.render('notes/edit-note', { note });
};

notesCtrl.updateNote = async (req, res) => {
    const { title, description } = req.body;
    await Note.findByIdAndUpdate(req.params.id, {title, description});
    // res.send('Update Note');
    req.flash('success_msg', 'Note Updated Successfully');
    res.redirect('/notes');
};

notesCtrl.deleteNote = async(req, res) => {
    await Note.findByIdAndDelete(req.params.id);
    // res.send('Delete note ' + req.params.id);
    req.flash('success_msg', 'Note Deleted Successfully');
    res.redirect('/notes');
};

module.exports = notesCtrl;
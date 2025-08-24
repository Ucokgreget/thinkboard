const Note = require('../model/noteModel');
const {createCustomError} =require('../error/custom-error')


const getAllNotes = async (req, res) => {
    const notes = await Note.find({});
    res.status(200).json({notes})
}

const createNote = async (req, res) => {
    const {title, content} = req.body
    const note = new Note({title, content});

    const savedNote = await note.save();
    res.status(200).json(savedNote);
}

const getSingleNote = async(req, res, next) =>{
    const {id} = req.params;
    const note = await Note.findOne({_id:id});
    if(!note){
        return next(createCustomError(`no data with id: ${id}`, 404))
    }
    res.status(200).json(note)
}

const deleteNote = async (req, res, next) =>{
    const {id} = req.params;
    const note = await Note.findOneAndDelete({_id:id});
    if(!note){
        return next(createCustomError(`no data with id: ${id}`, 404))
    }
    res.status(200).json(note)
}

const updateNote = async (req, res, next) =>{
    const {id} = req.params;
    const {title, content} = req.body;

    const note = await Note.findOneAndUpdate({_id:id},{title, content}, {
        new:true,
        runValidators:true
    });
    if(!note){
        return next(createCustomError(`no data with id: ${id}`, 404))
    }
    res.status(200).json(note)
}
















module.exports = {
    getAllNotes,
    createNote,
    getSingleNote,
    deleteNote,
    updateNote
}
const express = require('express')
const router = express.Router();
const{
    getAllNotes,
    createNote,
    getSingleNote,
    deleteNote,
    updateNote
} = require('../controller/noteController')


router.route('/').get(getAllNotes).post(createNote)
router.route('/:id').get(getSingleNote).delete(deleteNote).put(updateNote)


module.exports = router;
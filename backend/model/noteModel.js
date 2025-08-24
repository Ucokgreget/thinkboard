const mongoose = require('mongoose');


const notesSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    content:String
    }, 
    {timestamps:true}
)

module.exports = mongoose.model('Note', notesSchema);
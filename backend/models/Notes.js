const mongoose = require('mongoose');
const {Schema} = mongoose;

const NotesSchema = new Schema({
    //adding user(foreign) to associate all notes 
    //of a user with that user
    user:{
       type:mongoose.Schema.Types.ObjectId,
       ref:'user'  //reference model
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true,
    },
    tag:{
        type:String,
        default:"General"
    },
    date:{
        type:Date,
        default:Date.now
    },
})

module.exports = mongoose.model('notes',NotesSchema)
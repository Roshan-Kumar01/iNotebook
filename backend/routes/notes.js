const express = require('express');
const router = express.Router();
const Notes = require('../models/Notes')
const fetchUser = require('../middleware/fetchUser')
const { body, validationResult } = require('express-validator');

//Route1:Get All the notes using: POST "/api/notes/fetchallnotes".login required
router.get('/fetchallnotes',fetchUser,async (req,res) => {
    try {
        const notes = await Notes.find({user:req.user.id})
        res.json(notes)
    } catch (error) {
        console.log(error.messase)
       res.status(500).send("Internal Server Error")
    }
})

//Route2:Add a new note using: POST "/api/notes/addnote".login required
router.post('/addnote',fetchUser,
body('title').isLength({min:3}).withMessage("Enter a valid title"),
body('description').isLength({min:5}).withMessage('Description must be atleast 5 character')
,async (req,res) => {
    try {
        const {title, description, tag} = req.body;
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()});
        } 

        const note = new Notes({
            title,description,tag,user:req.user.id
        })
        const saveNote= await note.save()
        // console.log("saveNote",saveNote)
        res.json(saveNote)
    } catch (error) {
        console.log(error.messase)
        res.status(500).send("Internal Server Error2")  
    }
})

//Route3:Update an existing note: PUT "/api/notes/updatenote".login required
router.put('/updatenote/:id',fetchUser,
async (req,res) => {
    const{title, description, tag} = req.body;
    //Create a newNote object
    const newNote = {};
    if(title){newNote.title = title};
    if(description){newNote.description = description};
    if(tag){newNote.tag=tag};

    //Find the note to be deleted and delete it
    let note = await Notes.findById(req.params.id);
    if(!note){return res.status(404).send("Note Fount")}

    if(note.user.toString() !== req.user.id){
        return res.status(401).send("Not Allowed")
    }

    note = await Notes.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true})
    res.json({note});
})

//Route4:Delete an existing note: DELETE "/api/notes/deletenote".login required
router.delete('/deletenote/:id',fetchUser,
async (req,res) => {

    //Find the note to be updated and update it
    let note = await Notes.findById(req.params.id);
    if(!note){return res.status(404).send("Note Fount")}

    if(note.user.toString() !== req.user.id){
        return res.status(401).send("Not Allowed")
    }

    note = await Notes.findByIdAndDelete(req.params.id)
    res.json({"Success":"Note has been deleted"});
})
module.exports = router
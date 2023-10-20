import React, { useState } from "react";
import NoteContext from "./noteContext";



const NoteState = (props) => {
      const notesInitial = [
          {
            "_id": "652e3f061cf831f9a6acf7aa",
            "user": "652e3dad6c9c7e225408f53f",
            "title": "My Title",
            "description": "Please wake up early",
            "tag": "personal",
            "date": "2023-10-17T08:00:06.427Z",
            "__v": 0
          },
          {
            "_id": "652e61631f2bac7834e9b2e2",
            "user": "652e3dad6c9c7e225408f53f",
            "title": "My Title",
            "description": "Please wake up early",
            "tag": "personal",
            "date": "2023-10-17T10:26:43.475Z",
            "__v": 0
          },
          {
            "_id": "652e3f061cf831f9a6acf7bb",
            "user": "652e3dad6c9c7e225408f53f",
            "title": "My Title",
            "description": "Please wake up early",
            "tag": "personal",
            "date": "2023-10-17T08:00:06.427Z",
            "__v": 0
          },
          {
            "_id": "652e61631f2bac7834e9b2cc",
            "user": "652e3dad6c9c7e225408f53f",
            "title": "My Title",
            "description": "Please wake up early",
            "tag": "personal",
            "date": "2023-10-17T10:26:43.475Z",
            "__v": 0
          },
          {
            "_id": "652e3f061cf831f9a6acf7dd",
            "user": "652e3dad6c9c7e225408f53f",
            "title": "My Title",
            "description": "Please wake up early",
            "tag": "personal",
            "date": "2023-10-17T08:00:06.427Z",
            "__v": 0
          },
          {
            "_id": "652e61631f2bac7834e9b2ee",
            "user": "652e3dad6c9c7e225408f53f",
            "title": "My Title",
            "description": "Please wake up early",
            "tag": "personal",
            "date": "2023-10-17T10:26:43.475Z",
            "__v": 0
          },
          {
            "_id": "652e3f061cf831f9a6acf7ff",
            "user": "652e3dad6c9c7e225408f53f",
            "title": "My Title",
            "description": "Please wake up early",
            "tag": "personal",
            "date": "2023-10-17T08:00:06.427Z",
            "__v": 0
          },
          {
            "_id": "652e61631f2bac7834e9b2gg",
            "user": "652e3dad6c9c7e225408f53f",
            "title": "My Title",
            "description": "Please wake up early",
            "tag": "personal",
            "date": "2023-10-17T10:26:43.475Z",
            "__v": 0
          },{
            "_id": "652e3f061cf831f9a6acf7hh",
            "user": "652e3dad6c9c7e225408f53f",
            "title": "My Title",
            "description": "Please wake up early",
            "tag": "personal",
            "date": "2023-10-17T08:00:06.427Z",
            "__v": 0
          },
          {
            "_id": "652e61631f2bac7834e9b2zz",
            "user": "652e3dad6c9c7e225408f5ii",
            "title": "My Title",
            "description": "Please wake up early",
            "tag": "personal",
            "date": "2023-10-17T10:26:43.475Z",
            "__v": 0
          },
          {
            "_id": "652e3f061cf831f9a6acf7jj",
            "user": "652e3dad6c9c7e225408f53f",
            "title": "My Title",
            "description": "Please wake up early",
            "tag": "personal",
            "date": "2023-10-17T08:00:06.427Z",
            "__v": 0
          },
          {
            "_id": "652e61631f2bac7834e9b2kk",
            "user": "652e3dad6c9c7e225408f53f",
            "title": "My Title",
            "description": "Please wake up early",
            "tag": "personal",
            "date": "2023-10-17T10:26:43.475Z",
            "__v": 0
          }
        ]
    const[notes,setNotes] = useState(notesInitial);

    //Add a Note
    const addNote = (title, description, tag) =>{
      //TODO:API CALL
      const note = {
        "_id": "652e61631f2bac7834e9b2kk",
        "user": "652e3dad6c9c7e225408f53f",
        "title": title,
        "description": description,
        "tag": tag,
        "date": "2023-10-17T10:26:43.475Z",
        "__v": 0
      }
      setNotes(notes.concat(note))
    }
    // Delete a Note
    const deleteNote = (id) =>{
      //TODO:API CALL
      const newNotes = notes.filter((note) => {return note._id!==id})
      setNotes(newNotes)
    }
    // Edit a Note
    const editNote = (id, title, description, tag) =>{
      
    }

    return (
        <NoteContext.Provider value={{notes, addNote, deleteNote, editNote}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;
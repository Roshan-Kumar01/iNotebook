import React, { useState } from "react";
import NoteContext from "./noteContext";



const NoteState = (props) => {
  const host = "http://localhost:5000"
  const notesInitial = []
  //Add a Note
  const getNotes = async(title, description, tag) =>{
    //TODO:API CALL
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET", 
      headers: {
        "Content-Type": "application/json",
        "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjUyZTNkYWQ2YzljN2UyMjU0MDhmNTNmIn0sImlhdCI6MTY5NzUyOTI2MX0.myGDXylEtD_rvAjivXSSs0HJWUjsb7ns1XfBx4UXg7k"
        },
      });
      //Logic to add on client side
      const json = await response.json()
      // console.log(json)
      setNotes(json)
    }
    const[notes,setNotes] = useState(notesInitial);

    //Add a Note
    const addNote = async(title, description, tag) =>{
      //TODO:API CALL
      const response = await fetch(`${host}/api/notes/addnote`, {
        method: "POST", 
        headers: {
          "Content-Type": "application/json",
          "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjUyZTNkYWQ2YzljN2UyMjU0MDhmNTNmIn0sImlhdCI6MTY5NzUyOTI2MX0.myGDXylEtD_rvAjivXSSs0HJWUjsb7ns1XfBx4UXg7k"
        },
        body: JSON.stringify({title,description,tag}),
      });
      const json = await response.json()
      console.log("addedNote",json)
      //Logic to add on client side
      const note = {
        "_id": json._id,
        "user": "652e3dad6c9c7e225408f53f",
        "title": title,
        "description": description,
        "tag": tag,
        "date": "2023-10-17T10:26:43.475Z",
        "__v": 0
      }
      setNotes(notes.concat(note))
      // console.log(note)
    }
    // Delete a Note
    const deleteNote = async(id) =>{
      //TODO:API CALL
      const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
        method: "DELETE", 
        headers: {
          "Content-Type": "application/json",
          "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjUyZTNkYWQ2YzljN2UyMjU0MDhmNTNmIn0sImlhdCI6MTY5NzUyOTI2MX0.myGDXylEtD_rvAjivXSSs0HJWUjsb7ns1XfBx4UXg7k"
        }
      });
      //Logic to delete on client side
      const newNotes = notes.filter((note) => {return note._id!==id})
      setNotes(newNotes)
    }
    // Edit a Note
    const editNote = async (id, title, description, tag) =>{
      //API Call
      const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
        method: "PUT", 
        headers: {
          "Content-Type": "application/json",
          "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjUyZTNkYWQ2YzljN2UyMjU0MDhmNTNmIn0sImlhdCI6MTY5NzUyOTI2MX0.myGDXylEtD_rvAjivXSSs0HJWUjsb7ns1XfBx4UXg7k"
        },
        body: JSON.stringify({title,description,tag}),
      });
      //Logic to edit in client
      let newNotes = JSON.parse(JSON.stringify(notes))
      for(let index = 0; index < newNotes.length; index++)
      {
        const element = newNotes[index];
        if(element._id === id)
        {
           newNotes[index].title = title;
           newNotes[index].description = description;
           newNotes[index].tag = tag;
           break;
        }
      } 
      setNotes(newNotes)
    }

    return (
        <NoteContext.Provider value={{notes, addNote, deleteNote, editNote, getNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;
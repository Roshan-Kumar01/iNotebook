import React, {useContext, useState} from 'react'
import noteContext from '../context/notes/noteContext'

const AddNote = (props) => {
    const{showAlert} = props;
    const context = useContext(noteContext)
    const{addNote} = context;
    const[note,setNote] = useState({title:"",description:"",tag:""})
    const handleClick = (e) => {
      e.preventDefault();  //stop page reloading
      addNote(note.title,note.description,note.tag)
      setNote({title:"",description:"",tag:""})
      showAlert("Note added successfully","success");
    }
    const onChange = (e) => {
      setNote({...note, [e.target.name]:e.target.value})
    }
  return (
    <div className="container my-3">
                <h2>Add a Note</h2>
                <form>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input type="text" placeholder='Must be of atleast 5 character' value={note.title} className="form-control" id="title" name="title" aria-describedby="emailHelp" onChange={onChange}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <input type="text" placeholder='Must be of atleast 5 character' value={note.description} className="form-control" id="description" name="description" onChange={onChange}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="tag" className="form-label">Tag</label>
                        <input type="text" className="form-control" id="tag" name="tag" value={note.tag} onChange={onChange}/>
                    </div>
                    <button disabled={note.title.length<5||note.description.length<5} type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
                </form>
            </div>
  )
}

export default AddNote
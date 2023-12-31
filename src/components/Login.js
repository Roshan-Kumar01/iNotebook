import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'

const Login = (props) => {
    const {showAlert} = props
    let navigate = useNavigate()
    const[credentials,setCredentials] = useState({email:"",password:""})
    
    const onchange = (e) => {
        setCredentials({...credentials,[e.target.name]:e.target.value})
    }
    const handleSubmit = async(e) =>{
        e.preventDefault()
            //TODO:API CALL
            const response = await fetch(`http://localhost:5000/api/auth/login`, {
              method: "POST", 
              headers: {
                "Content-Type": "application/json",
                },
               body:JSON.stringify({email:credentials.email,password:credentials.password})
              });
              const json = await response.json();
              console.log(json);
              if(json.success)
              {
                //to do work
                localStorage.setItem('token',json.authtoken)
                navigate("/")
                showAlert("Loged in Successfully","success")
              }else
              {
                showAlert("Invalid Credentials","danger")
              }
            
    }
    return (
        <div>
            <h2 className='mt-3'>Login to continue to iNotebook</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name = "email" aria-describedby="emailHelp" value={credentials.email} onChange={onchange} />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name = "password" value={credentials.password} onChange={onchange}/>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Login
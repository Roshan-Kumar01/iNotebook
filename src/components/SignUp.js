import React,{ useState }from 'react'
import {useNavigate} from 'react-router-dom'

const SignUp = (props) => {
    const{showAlert} = props
    let navigate = useNavigate()
    const[credentials,setCredentials] = useState({name:"",email:"",password:"",cpassword:""})
    
    const onchange = (e) => {
        setCredentials({...credentials,[e.target.name]:e.target.value})
    }
    const handleSubmit = async(e) =>{
        e.preventDefault()
            //TODO:API CALL
            const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
              method: "POST", 
              headers: {
                "Content-Type": "application/json",
                },
               body:JSON.stringify({name:credentials.name,email:credentials.email,password:credentials.password})
              });
              const json = await response.json();
              console.log(json);
              if(json.success)
              {
                //to do work
                localStorage.setItem('token',json.authtoken)
                navigate("/")
                showAlert("Account created successfuly","success")
              }else
              {
                showAlert("The email address you're trying to add, has been registered as an account already","warning")
              }
            
    }
    return (
        <div className='container mt-4'>
            <h2>Create an account to use iNotebook</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" name="name" aria-describedby="emailHelp" onChange={onchange} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" onChange={onchange} required/>
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" name="password" id="password" onChange={onchange} minLength={5} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" name="cpassword" id="cpassword" onChange={onchange} minLength={5} required/>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default SignUp
import { useState } from "react"
import { Link } from "react-router-dom"
import { Signup } from "./Signup"
import {useNavigate} from "react-router-dom"
import Chat from "./Chat"

export const Home = ()=>{


    const [login, SetLogin] = useState({
        email:"",
        password:""
    })
    const [show, setShow] = useState(false)
  const navigate =   useNavigate()


    const handleChange = (e)=>{
          const {name, value} = e.target
        SetLogin({...login, [name]:value})
    }


    const handleSubmit = async(e)=>{
   e.preventDefault()
   
   const responnse = await fetch("http://localhost:3000/login",{
    method:"POST",
    headers:{
        "Content-Type": "application/json",
       
    },
    
    body:JSON.stringify(login)
   })

   const data = await responnse.json()
   console.log(data);
   
   if(responnse.ok){
    localStorage.setItem("token",data.user.token)
     navigate("/search")
     SetLogin(data)
   }

   if(!responnse.ok){
    alert("incorrect email and Password")
   }
   
    }
   

    return (
        <>
           <div className="App ">
             
            <form onSubmit={handleSubmit}>
           
               <div className="form">
                <h1>Talk-A-Tive</h1>
                 <div className="email">
                    Email:<input type="email"
                 name="email"
                 placeholder="Enter Email"
                 value={login.email}
                 onChange={handleChange}
                 
                  /><br/> <br/>
                  
                 </div>

                 Password:<input type= {show ? "text" : "password"}
                 name="password"
                 placeholder="Enter password"
                 value={login.password}
                 onChange={handleChange} 
                // onClick={()=> setShow(!show)}>👁️
                 />
                    
                  <br/><br/>
                  
                 <button  type="submit">Login
                  <span> If u dont have acc</span>
                  <Link to="/signup" > Signup</Link>
                  </button>

<button type="submit">Login</button>


               </div>

              

                 
            </form>
           </div>
        </>
    )
}
import { useState } from "react"
import { useNavigate } from "react-router-dom"
export const Signup = ()=>{

    const [signup, setSignup] = useState({
        name:"",
        email:"",
        password:"",
       
    })

    const [show, setShow] = useState(false)
const navigate = useNavigate()
const [pic, setPic] = useState(null)
const [us, setUser] = useState(null)

     const handleChange = (e)=>{
          const {name, value} = e.target
        setSignup({...signup, [name]:value})
    }

    const handleSubmit = async(e)=>{
        e.preventDefault()
        // const response = await fetch("http://localhost:3000/signup",{
        //     method:"POST",
        //     headers:{
        //         "Content-Type": "application/json"
        //     },
        //     body: JSON.stringify(signup)
        // })

        // const data = await response.json()
        // console.log(response.data);

        const formData = new FormData()
        formData.append("name", signup.name)
        formData.append("email", signup.email)
        formData.append("password", signup.password)
        formData.append("pic", pic)

        const response = await fetch("http://localhost:3000/signup",{
            method:"POST",
            body:formData
        })
        
        const data = await response.json()
        console.log(data);
        

        if(!response.ok)
        {
            alert(data.message)
            return;
        }
        setUser(data)
            navigate("/search")
        
        

    }

    return (
        <>
            <div className="App ">
             
            <form onSubmit={handleSubmit}>
           
               <div className="form">
                <h1>Talk-A-Tive</h1>

                <div>
                    Name:<input type="name"
                 name="name"
                 placeholder="Enter name"
                 value={signup.name}
                 onChange={handleChange} />
                </div>

                 <div className="email">
                    Email:<input type="email"
                 name="email"
                 placeholder="Enter Email"
                 value={signup.email}
                 onChange={handleChange}
                 
                  /><br/> <br/>
                  
                 </div>

                 Password:<input type= {show ? "text" : "password"}
                 name="password"
                 placeholder="Enter password"
                 value={signup.password}
                 onChange={handleChange} />
                    <button onClick={()=> setShow(!show)}>👁️</button>
                  <br/><br/>

               Pic:<input type="file" name="pic"
               accept="image/*"
               onChange={(e)=> setPic(e.target.files[0])}
                />

                 <button  type="submit">Signup</button>

               </div>

              

                 
            </form>

          
           </div>

           <p>{signup.name}</p>
           <p>{signup.email}</p>
           {us && <img src={`http://localhost:3000/${us.data.pic}`} width={100} alt="profile" />}

        </>
    )
}
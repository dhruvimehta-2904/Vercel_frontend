import { useEffect, useState } from "react"

export const Search = () => {
  const [users, setUsers] = useState([])
  const [name, setName] = useState("")

  const fetchUser = async () => {
    const token = localStorage.getItem("token")

    const response = await fetch("https://vercel-backend-ten-alpha.vercel.app/all", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })

    const data = await response.json()
    console.log(data);
    
    

    if (data && Array.isArray(data.user)) {
        setUsers(data.user) 
    } else {
        console.error("API response structure is unexpected:", data);
        setUsers([]); 
    }
  }

  const handleSubmit = async(e)=>{
    e.preventDefault()
    const token = localStorage.getItem("token")
    const response = await fetch(`https://vercel-backend-ten-alpha.vercel.app/search?name=${name}`,{
    //    method:"GET",
        headers:{
            "Content-Type":"application/json",
            Authorization: `Bearer ${token}`
        },
    })
    const data = await response.json()
    console.log(data);
    
   if (Array.isArray(data.user)) {
      
      setUsers(data.user)
   }else if (data.user && typeof data.user === 'object') {
     
      setUsers([data.user])}
  }
  

  useEffect(() => {
    fetchUser()
  }, [])

  return (
    <>
    <form onSubmit={handleSubmit}>
        <input type="text" name="name"
        value={name}
        onChange={(e)=> setName(e.target.value)} />
        <button type="submit" >Serach</button>
    </form>
<ul>
     {Array.isArray(users) &&
      users.map((ele) => (
        <li key={ele._id}>
          <p>Name: {ele.name}</p>
          <p>Email: {ele.email}</p>
          {ele.pic && (
            <img src={`https://vercel-backend-ten-alpha.vercel.app/${ele.pic}`} width={80} />
          )}
        </li>
      ))}
    </ul>
    </>
  )}

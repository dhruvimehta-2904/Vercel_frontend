    import React, { useEffect, useState } from 'react'
    import axios from "axios"


    const Chat = () => {

        const [chatss, setChat] = useState([])
const fetchChat = async()=>{
    try {
            
            const response =  await axios.get("/api/chat")
                console.log("error response",response.data);  
                setChat(response.data)

            }
    
        catch (error) {
            console.log(error);
            
        }
    }
         useEffect(()=>{
                fetchChat()
            },[])
        

    return (
        <>
        <ul>
            {
                chatss.map((elem)=>{
                    return <li key={elem._id}>
                        <p>{elem.chatName}</p>
                    </li>
                })
            }
        </ul>
        </>
    )
    }

    export default Chat

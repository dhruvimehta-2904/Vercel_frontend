import {BrowserRouter, Route, Router, Routes} from "react-router-dom"
import { Home } from "./Components/Home"
import Chat from "./Components/Chat"
import { Signup } from "./Components/Signup"
import { Search } from "./Components/Search"


export const App = ()=>
{
  return (
   
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/chat" element={<Chat />} />
        <Route path="/signup" element={<Signup />} />
       <Route path="/search" element={<Search />} />
      </Routes>
    </BrowserRouter>
   
  )
}
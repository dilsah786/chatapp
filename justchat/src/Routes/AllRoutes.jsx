import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../component/Home'
import Chats from '../component/Chats'
import Login from '../AuthComponent/Login'
import Register from '../AuthComponent/Register'

const AllRoutes = () => {
  return (
    <div>
    <Routes>
        <Route path='/' element={<Home/>}   />
        <Route path='/login' element={<Login/>}   />
        <Route path='/register' element={<Register/>}   />
        <Route path='/chats' element={<Chats/>}  />
    </Routes>
    </div>
  )
}

export default AllRoutes
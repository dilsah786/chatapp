import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../component/Home'
import Chats from '../component/Chats'
import Login from '../AuthComponent/Login'
import Register from '../AuthComponent/Register'
import MainAuth from '../AuthComponent/MainAuth'
import Private from './Private'
import MyChats from '../ChatPages/MyChats'

const AllRoutes = () => {
  return (
    <div>
    <Routes>
        <Route path='/' element={<Private><Home/></Private>}   />
        <Route path='/auth' element={<MainAuth/>}   />
        <Route path='/chats' element={<Private><Chats/></Private>}  />
        <Route path='/mychat' element={<MyChats/>}   />
    </Routes>
    </div>
  )
}

export default AllRoutes
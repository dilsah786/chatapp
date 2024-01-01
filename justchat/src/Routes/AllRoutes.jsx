import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../component/Home'
import Chats from '../component/Chats'

const AllRoutes = () => {
  return (
    <div>
    <Routes>
        <Route path='/' element={<Home/>}   />
        <Route path='/chats' element={<Chats/>}  />
    </Routes>
    </div>
  )
}

export default AllRoutes
import React from 'react'
import {Routes, Route } from "react-router-dom";

import Home from '../pages/home';
import About from '../pages/about';
import { Musicgroups } from '../pages/musicgroups';
import { GroupView } from '../components/groupview';
import  GroupsDetaliesEdit from '../components/groupedit';

export function AppRouter() {
  return (
    <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/about' element={<About/>}></Route>
        <Route path='/musicgroups' element={<Musicgroups/>}></Route>
        <Route path='/groupview/:id' element={<GroupView/>}></Route>
        <Route path='/groupedit/:id' element={<GroupsDetaliesEdit/>}></Route>
    </Routes>
  )
}

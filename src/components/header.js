import React from 'react'
import {NavMenu} from '../router/navmenu';
import logo from '../img/logo.png';
export default function Header()
{
    return (
    <div className="container">
           <img src={logo} className="App-logo" alt="logo" />
        <NavMenu/>
    </div>
    );
}


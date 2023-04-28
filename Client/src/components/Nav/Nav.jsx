import React from 'react'
import SearchBar from '../SearchBar/SearchBar'
import './Nav.css'
import { NavLink, useLocation } from 'react-router-dom'

export default function Nav({ onSearch, addRandom, logOut, display }) {
  const location = useLocation()
  return (
    <div className={`Nav-Div ${display ? '' : 'Nav-Hide'}`}>
        <div className='Nav-Logo'><img src={require('../Images/Logo.png')}/></div>
        <SearchBar onSearch={onSearch}/>
        <button className={location.pathname === '/home' ? 'Nav-Random' : 'Nav-Random-Disabled'} title={location.pathname === '/home' ? 'Add random' : null} onClick={addRandom} disabled={location.pathname !== '/home'}><img src={require('../Images/shuffle.png')}/></button>
        <NavLink to='about' className={({isActive}) => {return (isActive ? "Nav-NavLink-About-Active" : "Nav-NavLink-About-Inactive")}}title='About'><img src={require('../Images/AboutImg.png')}/></NavLink>
        <NavLink to='home' className={({isActive}) => {return (isActive ? "Nav-NavLink-Home-Active" : "Nav-NavLink-Home-Inactive")}} title='Home'><img src={require('../Images/HomeImg.png')}/></NavLink>
        <NavLink to='favorites' className={({isActive}) => {return (isActive ? "Nav-NavLink-Favorites-Active" : "Nav-NavLink-Favorites-Inactive")}} title='Favorites'><img src={require('../Images/FavoritesImg.png')}/></NavLink>
        <button className='Nav-LogOut' title='Log Out' onClick={logOut}><img src={require('../Images/logOutImg.png')}/></button>
    </div>
  )
}

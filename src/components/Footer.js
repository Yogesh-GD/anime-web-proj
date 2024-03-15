import React, { useContext } from 'react';
import { themecontext } from '../App';
import { NavLink } from 'react-router-dom';





export default function Footer() {
  const theme = useContext(themecontext)
  return (
    <div className={`${theme?"bg-[#D8D8D8]":"bg-[#000] text-[#fff]"} relative`} >
      <div className="navbar flex flec-col sm:flex-row items-center justify-evenly py-5">
        <div className="text-3xl"><span style={theme ? { color: '#36BCE5', } : {}}>Ani</span>me</div>

        <div className="flex flex-col text-xl gap-2">

          <NavLink to={'/'} >Home</NavLink>
          <NavLink to={'/Anime'}>Anime</NavLink>
          <NavLink to={'Manga'}>Manga</NavLink>
          <NavLink to={''}>Contacts</NavLink>
        </div>
       
      </div>
      <div className="w-full bg-black text-white text-xl text-center">Copyright ©2024 All rights reserved |</div>
    </div>
  )
}

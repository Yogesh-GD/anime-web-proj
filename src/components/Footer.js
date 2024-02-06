import React, { useContext } from 'react';
import { themecontext } from '../App';





export default function Footer() {
  const theme = useContext(themecontext)
  return (
    <div className='footer' style={theme ? { background: '#000', } : {}}>
      <span style={theme? { background: '#000', border: '1px solid rgb(54, 188, 229)' } : {}}>^</span>
      <div className="navbar">
        <div className="logoname"><span style={theme ? { color: '#36BCE5', } : {}}>Ani</span>me</div>

        <div className="navbarlinks">

          <a href="king" className="navlink" >Homepage</a>
          <a href="king" className="navlink">Catagories</a>
          <a href="king" className="navlink">Our Blog</a>
          <a href="king" className="navlink">Contacts</a>
        </div>
        <div className="navuser">Copyright ©2023 All rights reserved |</div>
      </div>

    </div>
  )
}

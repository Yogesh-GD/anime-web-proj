import React, { useState, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';
import { themecontext } from '../App';
import DarkMode from './DarkMode';
import AnimeSearch from './AnimeSearch';


const Navlink = ({ title = "title", path = "/", event }) => {
    const [hover, setHover] = useState(false)
    return (
        <>
            <NavLink to={path} className="navlink" style={hover ? { color: "rgb(54, 188, 229)" } : {}}
                onClick={event}
                onMouseOver={() => setHover(true)}
                onMouseLeave={() => setHover(false)}>
                {title}
            </NavLink>
        </>
    )
}


export default function NavBar() {
    const [showNav, setShowNav] = useState(false)
    const theme = useContext(themecontext)

    const handleClick = () => {
        setShowNav(false)
    }
    return (

        <div className='navbarcont' id='navbarcont' style={theme ? { background: '#000', } : {}}>
            <div className="navbar">
                <div className="logoname"><span style={theme ? { color: '#36BCE5', } : {}}>Ani</span>me</div>

                <div className="navbarlinks" style={showNav ? { background: `${theme ? "#000" : ""}`, height: 'auto', } : {}} >
                    <Navlink title='Homepage' path="/" event={handleClick} >Homepage</Navlink>
                    <div className="navlink drpdwncont" >Catagory
                    <div className='drpdwn '>
                    <NavLink className="navlink" to={'/Anime'} onClick={handleClick}><span >Anime</span></NavLink>
                    <NavLink className="navlink" to={'/Manga'} onClick={handleClick} ><span>Manga</span></NavLink>
                    </div>
                    </div>
                    <NavLink to={'/notfound'} className="navlink" onClick={handleClick}  >Contacts</NavLink>
                    <div className='navlink'><DarkMode /></div>
                </div>


                
                <div >
                    <AnimeSearch />

                </div>
                <span className='navshowbtn' onClick={() => setShowNav(!showNav)}><FontAwesomeIcon icon={!showNav ? faBars : faXmark} /></span>
            </div>

        </div>
    )
}

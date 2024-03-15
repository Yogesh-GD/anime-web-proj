import React, { useState, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faCaretDown, faCaretUp, faXmark } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';
import { themecontext } from '../App';
import DarkMode from './DarkMode';


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

    const [toogle, setToogle] = useState(false)
    const [drpdwntoogle, setdrpdwntoogle] = useState(false)
    const drpdwnshow = () => {
        setdrpdwntoogle(drpdwntoogle => !drpdwntoogle)
    }

    const theme = useContext(themecontext)

    const handleClick = () => {
        setToogle(false)
    }
    return (
 
        <div className={` w-full ${theme?'bg-gradient-to-r from-[#d8d8d8] to-[#d8d8d8] text-black':" bg-[#000] text-[#fff]"} backdrop-blur-sm `} id='navbarcont' >
            <div className=" mx-3   flex justify-between items-center ">
                <div className={`text-3xl `}><span className={`text-[#36BCE5]`} >Ani</span>me</div>

                <div className={` shadow-lg sm:shadow-none ${theme?"bg-[#fff]":"bg-[#000]"}  sm:pt-0  overflow-hidden sm:overflow-visible flex text-lg left-0 absolute z-50 ${toogle ? " h-auto pt-3  " : " h-0"} sm:bg-transparent sm:h-auto top-full   flex-col w-full sm:flex-row  sm:relative justify-center items-center gap-3 *:px-2 *:py-2  *:sm:w-auto *:w-full`}  >
                    <Navlink title='Homepage' path="/" event={handleClick} >Home</Navlink>
                    <div className="relative group " >
                        <div className='flex justify-between items-center gap-4 select-none cursor-pointer' onClick={drpdwnshow} > <span>Category</span> <span><FontAwesomeIcon icon={!drpdwntoogle ? faCaretDown : faCaretUp} /></span></div>
                        <div className={`static  sm:absolute sm:shadow-lg ${theme?"bg-[#eeeeee] ":"bg-[#000] text-[#fff]"} top-full left-0 flex flex-col  overflow-hidden  w-full    ${drpdwntoogle ? 'h-auto' : 'h-0'}  *:w-full *:px-2 *:py-3 `}>
                            <NavLink className="" to={'/Anime'} onClick={()=>{setdrpdwntoogle(false) ; handleClick()}}><span >Anime</span></NavLink>
                            <NavLink className="" to={'/Manga'} onClick={()=>{setdrpdwntoogle(false) ; handleClick()}} ><span>Manga</span></NavLink>
                        </div>
                    </div>
                    <NavLink to={'/notfound'} className="navlink" onClick={handleClick}  >Contacts</NavLink>
                    <div className='navlink' onClick={handleClick}><DarkMode /></div>
                </div>



                <div >


                </div>
                <span className=' block sm:hidden text-xl  ' onClick={() => setToogle(!toogle)}><FontAwesomeIcon icon={!toogle ? faBars : faXmark} /></span>
            </div>

        </div>
    )
}

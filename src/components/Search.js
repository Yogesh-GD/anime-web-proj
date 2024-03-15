import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react'
import { NavLink } from 'react-router-dom';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { themecontext } from '../App';


export default function Search({type}) {
    const [data, setData] = useState('');
    const [searchInput, setSearchInput] = useState('')
    const [load, setLoad] = useState(false)
    const theme = useContext(themecontext)
    const [error, setError] = useState('')

    useEffect(() => {

        const fetchdata = async () => {
            try {
                setLoad(false);
                const data = await axios.get(`https://api.jikan.moe/v4/${type.toLowerCase()}?q=${searchInput}?page=1&limit=10`)

                setData(data.data.data)
                setLoad(true)


            }
            catch (error) {
                setError(error.message)
            }
        }

        let delay=setTimeout(()=>{
            if(searchInput){
                fetchdata();
            }
        },1000)

        return ()=> clearTimeout(delay)

    }, [searchInput,type])

    return (
        <div className={`${theme?"bg-[#909090] ":"bg-[#000]" } mb-16 rounded`}>
            <div className='flex  justify-end gap-5 px-3 py-3 shadow-lg' >
            <input className={ ` ${theme?"":"bg-[#2b2b2b]" } focus:outline-none rounded px-2  w-full sm:w-auto`} id='searchip' type="text" placeholder='Search' value={searchInput} onChange={(e) => { setSearchInput(e.target.value) }} />
            {searchInput.length?
            <NavLink className={"text-xl border-2 border-[#fff] px-4 rounded bg-black text-white py-1"} to={`/Search/${searchInput}/${type}`} onClick={() => setSearchInput('')}><FontAwesomeIcon className='searchicon'  icon={faMagnifyingGlass} /></NavLink>
            :
            <label className={" border-2 border-[#fff]  text-xl px-4 rounded bg-black text-white py-1"} htmlFor="searchip"><FontAwesomeIcon className='searchicon'  icon={faMagnifyingGlass} /></label>
            }   
            </div>
           
            {
                <div className={`${theme?'bg-[#D8D8D8]':'bg-[#2b2b2b]'} shadow-inner rounded h-72 overflow-hidden overflow-y-auto  px-2 sm:px-10 py-6 flex flex-col gap-5`}>

                

                    {   searchInput.length?
                        load && data.map((value, index) => {
                            return (
                                <NavLink className={"flex gap-5 items-center"} to={`/${type}Detail/${value.mal_id}/${type}`} onClick={()=>setSearchInput('')} key={index}>
                                    <div className='w-16 h-16 rounded-full  '> 
                                    <img className=' w-16 h-16 rounded-full ' src={value.images.jpg.small_image_url} alt={value.title} /> </div>
                                    <h5 className=' w-3/4 px-1 break-words'>{value.title}</h5>   </NavLink>


                            )
                        })
                        : <div className='h-full text-5xl  text-[#9b9393]'>search  something</div>
                    }
                </div>
            }
        </div>
    )
}

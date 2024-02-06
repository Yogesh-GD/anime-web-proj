import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { themecontext } from '../App';


export default function AnimeSearch() {
    const [animeData, setAnimeData] = useState('');
    const [searchInput, setSearchInput] = useState('')
    const [load, setLoad] = useState(false)
    const theme = useContext(themecontext)

    useEffect(() => {

        const fetchdata = async () => {
            try {
                setLoad(false);
                const data = await axios.get(`https://api.jikan.moe/v4/anime?q=${searchInput}?page=1&limit=10`)

                setAnimeData(data.data.data)
                setLoad(true)


            }
            catch (error) {
                console.log(error)
            }
        }

        if (searchInput.length !== 0) { fetchdata(); }
    }, [searchInput])


    console.log(animeData)

    return (
        <div className='animesearch'>

            <input type="text" style={theme ? { borderColor: "#36BCE5" } : {}} value={searchInput} onChange={(e) => { setSearchInput(e.target.value) }} />
            <NavLink to={`AnimeSearch/${searchInput}`} onClick={() => setSearchInput('')}><FontAwesomeIcon className='searchicon' style={theme ? { color: '#36BCE5' } : {}} icon={faMagnifyingGlass} /></NavLink>
            {searchInput &&
                <div className="searchresultcont" style={theme ? { background: "#000" } : {}}>

                    {
                        load && animeData.map((value, index) => {
                            return (

                                <NavLink to={`/AnimeDetail/${value.mal_id}`} onClick={()=>setSearchInput('')} key={index}><div> <img src={value.images.jpg.small_image_url} /> </div><h5>{value.title}</h5>   </NavLink>


                            )
                        })
                    }
                </div>
            }
        </div>
    )
}

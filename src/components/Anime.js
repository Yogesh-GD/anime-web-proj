import React, { useContext, useEffect, useState } from 'react'
import Loadbar from './loadingbar';
import { themecontext } from '../App';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import Card from './Card';

export default function Anime({ api, title }) {
    const [animeData, setanimeData] = useState('');
    const [paginationData, setPaginationData] = useState("")
    const [load, setLoad] = useState(false)
    const [error, setError] = useState('')

    const [page, setPage] = useState(parseInt(localStorage.getItem('page')))
    const theme = useContext(themecontext)
    const apikey = api
    useEffect(() => {
        const fetchdata = async () => {
            try {
                const data = await axios.get(`${apikey}?page=${page}&limit=12`)
                setanimeData(data.data.data)
                setPaginationData(data.data.pagination)
                setLoad(true)

            }
            catch (error) {
                setError(error.message)
            }
        }

        fetchdata();
    }, [])


    return (
        <>

            {
                !load && <Loadbar />
            }

            {
                load && <div className="animetopiclist">
                    <div className="Animegene" style={theme ? { background: "#000", borderColor: "#36BCE5" } : {}}>
                        <h1>{title}</h1> <NavLink to={'/Anime'}><span>VIEW ALL</span></NavLink>
                    </div>
                    <div className="animelist">




                        {
                            animeData.map((anime, index) => {
                                return (

                                   <Card anime={anime} theme={theme} key={index}/>

                                )
                            })
                        }


                    </div>



                </div>
            }
        </>
    )

}

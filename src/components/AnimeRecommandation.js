import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react'
import { themecontext } from '../App';
import { NavLink, Routes } from 'react-router-dom';
import Loadbar from './loadingbar';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import AnimeDetail from '../pages/AnimeDetail';


export default function Recommandation({ animekey }) {
    console.log(animekey)
    const [recommandationData, setrecommandationData] = useState('');
    const [load, setLoad] = useState(false)
    const theme = useContext(themecontext)
    useEffect(() => {
        const fetchdata = async () => {
            try {
                setLoad(false);
                const data = await axios.get(`https://api.jikan.moe/v4/anime/${animekey}/recommendations`)
                setrecommandationData(data.data.data)
                setLoad(true)

            }
            catch (error) {
                console.log(error)
            }
        }

        fetchdata();
    }, [animekey])



    return (
        <>
            <Routes><Route path={`/AnimeDetail/:id`} element={<AnimeDetail />} ></Route></Routes>


            {
                !load && <Loadbar />
            }

            {
                load && <div className='recommandationcont'>
                    <div className="Animegene" style={theme ? { background: "#000", borderColor: "#36BCE5" } : {}}>
                        <h1>Recommandation</h1>
                    </div>
                    {
                        recommandationData.length===0&&<div>No Recommandation........</div>
                    }
                    <div className="recommandationlist">
                        {
                            recommandationData.map((data, index) => {
                                return (
                                    
                                        <div className="card" key={index}>
                                            <NavLink to={`/AnimeDetail/${data.entry.mal_id}`} style={theme ? { color: '#36BCE5' } : { color: "#E53637" }} onClick={() => { localStorage.setItem('animeDetailId', data.entry.mal_id) }} >
                                                <div className="cardimg">
                                                    <img src={data.entry.images.jpg.image_url} alt="" />
                                                </div>
                                            </NavLink>

                                            <div className="cardname">
                                                <NavLink to={`/AnimeDetail/${data.entry.mal_id}`} style={theme ? { color: '#36BCE5' } : { color: "#E53637" }}  > {data.entry.title}</NavLink>
                                            </div>
                                        </div>
                                    
                                )
                            })
                        }
                    </div>
                </div>
            }
        </>
    )
}

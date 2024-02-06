import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react'
import { NavLink } from 'react-router-dom';
import { themecontext } from '../App';
import Loadbar from './loadingbar';


export default function Detail({ animekey }) {

    const [animeDetail, setAnimeDetail] = useState('');
    const [load, setLoad] = useState(false)
    const theme = useContext(themecontext)
    useEffect(() => {
        const fetchdata = async () => {
            try {
                setLoad(false);
                const data = await axios.get(`https://api.jikan.moe/v4/anime/${animekey}`)
                setAnimeDetail(data.data.data)
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
            {
                !load && <Loadbar />
            }
            {
                load && <div className='animedetailscont'>
                    <div className="animedetails">
                        <div className="Animegene" style={theme ? { background: "#000", borderColor: "#36BCE5" } : {}}>
                            <h1>{animeDetail.title}</h1>
                        </div>

                        <div className="animeimg">
                            <img src={animeDetail.images.jpg.large_image_url} alt={animeDetail.title} />
                        </div>

                        <div className="details">
                            <h2>{animeDetail.title}</h2>

                            <div className="detailscategories">
                                <ul className='detailList'>
                                    <li><span className="detailname">Type:</span><span className="detailvalue">{animeDetail.type}</span></li>
                                    <li><span className="detailname">Studios:</span><span className="detailvalue">
                                        {animeDetail.studios.map((studio, index) => {
                                            return (<span key={index}>{studio.name},</span>)
                                        })}
                                    </span></li>
                                    <li><span className="detailname">Status:</span><span className="detailvalue">{animeDetail.status}</span></li>
                                    <li><span className="detailname">Score:</span><span className="detailvalue">{animeDetail.score}/{animeDetail.scored_by}</span></li>
                                    <li><span className="detailname">Duration:</span><span className="detailvalue">{animeDetail.duration}</span></li>
                                    <li><span className="detailname">Episodes:</span><span className="detailvalue">{animeDetail.episodes}</span></li>
                                    <li><span className="detailname">Rank:</span><span className="detailvalue">{animeDetail.rank}</span></li>
                                    <li><span className="detailname">Popularity:</span><span className="detailvalue">{animeDetail.popularity}</span></li>
                                    <li><span className="detailname">Genres:</span><span className="detailvalue">{animeDetail.genres.map((genre, index) => {
                                        return (
                                            
                                                <span key={index}>{genre.name},</span>
                                            
                                        )
                                    })}</span></li>
                                    <li><span className="detailname">Type:</span><span className="detailvalue">{animeDetail.type}</span></li>
                                </ul>
                            </div>

                            <div className="watchButton">
                                <button style={theme ? { background: '#000', } : {}}><NavLink to={`/AnimeWatch/${animekey}`} style={theme ? { background: '#000', color: "#36BCE5" } : {}}>Watch Now</NavLink></button>
                            </div>
                            <br />
                            <hr />
                            <br />
                            <p>{animeDetail.synopsis}</p>
                        </div>



                    </div>
                </div>


            }
        </>
    )
}

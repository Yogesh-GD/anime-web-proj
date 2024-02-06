import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react'
import { NavLink } from 'react-router-dom';
import { themecontext } from '../App';
import Loadbar from './loadingbar';


export default function Detail({ animekey }) {

    const [mangaDetail, setmangaDetail] = useState('');
    const [load, setLoad] = useState(false)
    const theme = useContext(themecontext)
    useEffect(() => {
        const fetchdata = async () => {
            try {
                setLoad(false);
                const data = await axios.get(`https://api.jikan.moe/v4/manga/${animekey}`)
                setmangaDetail(data.data.data)
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
                load && <div className='animedetailscont '>
                    <div className="animedetails">
                        <div className="Animegene" style={theme ? { background: "#000", borderColor: "#36BCE5" } : {}}>
                            <h1>{mangaDetail.title}</h1>
                        </div>

                        <div className="animeimg">
                            <img src={mangaDetail.images.jpg.large_image_url} alt={mangaDetail.title} />
                        </div>

                        <div className="details">
                            <h2>{mangaDetail.title}</h2>

                            <div className="detailscategories">
                                <ul className='detailList'>
                                    <li><span className="detailname">Type:</span><span className="detailvalue">{mangaDetail.type}</span></li>
                                    <li><span className="detailname">Volumes:</span><span className="detailvalue">{mangaDetail.volumes}</span></li>
                                    <li><span className="detailname">Status:</span><span className="detailvalue">{mangaDetail.status}</span></li>
                                    <li><span className="detailname">Score:</span><span className="detailvalue">{mangaDetail.score}/{mangaDetail.scored_by}</span></li>
                                    <li><span className="detailname">Publishing:</span><span className="detailvalue">{mangaDetail.publishing}</span></li>
                                    <li><span className="detailname">Chapters:</span><span className="detailvalue">{mangaDetail.chapters}</span></li>
                                    <li><span className="detailname">Rank:</span><span className="detailvalue">{mangaDetail.rank}</span></li>
                                    <li><span className="detailname">Popularity:</span><span className="detailvalue">{mangaDetail.popularity}</span></li>
                                    <li><span className="detailname">Genres:</span><span className="detailvalue">{mangaDetail.genres.map((genre, index) => {
                                        return (
                                            
                                                <span key={index}>{genre.name},</span>
                                            
                                        )
                                    })}</span></li>
                                    <li><span className="detailname">Type:</span><span className="detailvalue">{mangaDetail.type}</span></li>
                                </ul>
                            </div>

                            <br />
                            <hr />
                            <br />
                            <p>{mangaDetail.synopsis}</p>
                        </div>



                    </div>
                </div>


            }
        </>
    )
}

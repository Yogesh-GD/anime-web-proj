import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react'
import { themecontext } from '../App';
import Loadbar from './loadingbar';


export default function Detail({ animekey }) {

    const [mangaDetail, setmangaDetail] = useState('');
    const [load, setLoad] = useState(false)
    const theme = useContext(themecontext)
    const [error, setError] = useState('')

    useEffect(() => {
        const fetchdata = async () => {
            try {
                setLoad(false);
                const data = await axios.get(`https://api.jikan.moe/v4/manga/${animekey}`)
                setmangaDetail(data.data.data)
                setLoad(true)


            }
            catch (error) {
                setError(error.message)
            }
        }

        fetchdata();
    }, [animekey])

    if(error){
        return(
            <div className={`h-96 grid place-items-center text-xl`}>
                {error}
            </div>
        )
    }

    return (
        <>
            {
                !load && <Loadbar />
            }
            {
                load && <div className='animedetailscont '>
                    <div className="animedetails">
                    <div className={` ${theme?"bg-[#D8D8D8] border-[#000]":"bg-[#000000] border-[#6B6767]"} py-2 flex items-center justify-between px-2 mb-2  text-2xl border-l-4     `}>
                        <h1>{mangaDetail.title}</h1> <span></span>
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

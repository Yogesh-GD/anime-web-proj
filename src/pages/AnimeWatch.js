import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react'
import Loadbar from '../components/loadingbar';
import { themecontext } from '../App';
import { useParams } from 'react-router-dom';

export default function AnimeWatch() {
    const param=useParams()
    const [animeWatchdata, setAnimeWatchDate] = useState('')
    const [load, setLoad] = useState(false)
    const theme=useContext(themecontext)
    useEffect(() => {
        const fetchdata = async () => {
            try {
                const data = await axios.get(`https://api.jikan.moe/v4/anime/${param.id}/videos`)
                setAnimeWatchDate(data.data.data)
                setLoad(true)
            }
            catch (error) {
                console.log(error)
            }
        }

        fetchdata();
    }, [param.id])

    return (
        <>
            <div className="animewatchcont">
                {
                    !load && <Loadbar />
                }

                {load && animeWatchdata.promo.length && <div className="animetrailercont">
                    <iframe title={'Anime trailer'}
                        src={animeWatchdata.promo[0].trailer.embed_url}>
                    </iframe>

                </div>}

                {load &&

                    <div className="animeepicont">
                        {animeWatchdata.episodes.map((episode, index) => {
                            return (
                                <>
                                    <div className='AnimeEpisode' key={index} style={theme?{background:'#2d2d2d'}:{}}>
                                        <span>Episode: {episode.mal_id}</span>
                                        <h4><a href={episode.url}>Title: {episode.title}</a></h4>
                                    </div>
                                </>
                            )
                        })}
                    </div>
                }
            </div>


        </>
    )
}

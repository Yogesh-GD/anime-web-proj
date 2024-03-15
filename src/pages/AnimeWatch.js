import axios from 'axios';
import React, { useState, useEffect } from 'react'
import Loadbar from '../components/loadingbar';
import { useParams } from 'react-router-dom';

export default function AnimeWatch() {
    const param=useParams()
    const [animeWatchdata, setAnimeWatchDate] = useState('')
    const [load, setLoad] = useState(false)
    const [error, setError] = useState('')
    useEffect(() => {
        const fetchdata = async () => {
            try {
                const data = await axios.get(`https://api.jikan.moe/v4/anime/${param.id}/videos`)
                setAnimeWatchDate(data.data.data)
                setLoad(true)
            }
            catch (error) {
                setError(error.message)
            }
        }

        fetchdata();
    }, [param.id])

    if(error){
        return(
            <div className={`h-96 grid place-items-center text-xl`}>
                {error}
            </div>
        )
    }

    return (
        <>
            <div className="">
                {
                    !load && <Loadbar />
                }

                {load && animeWatchdata.promo.length && <div className=" flex justify-center items-center h-80 sm:h-[500px]">
                    <iframe className='w-full sm:w-4/5 h-full ' title={'Anime trailer'}
                        src={animeWatchdata.promo[0].trailer.embed_url}>
                    </iframe>

                </div>}

                {load &&

                    <div className=" flex flex-col-reverse my-10">
                        {animeWatchdata.episodes.map((episode, index) => {
                            return (
                            
                                    <div className='py-4' key={index}>
                                        <span className=''>Episode: {episode.mal_id}</span>
                                        <h4><a href={episode.url}>Title: {episode.title}</a></h4>
                                    </div>
                         
                            )
                        })}
                    </div>
                }
            </div>


        </>
    )
}

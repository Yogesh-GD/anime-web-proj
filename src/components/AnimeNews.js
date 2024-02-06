import React, { useContext, useEffect, useState } from 'react'
import { themecontext } from '../App';
import Loadbar from './loadingbar';
import axios from 'axios';


export default function AnimeNews({ animekey }) {
    const [AnimeNews, setAnimeNews] = useState('');
    const [load, setLoad] = useState(false)
    const theme = useContext(themecontext)
    useEffect(() => {

        const fetchdata = async () => {
            try {
                setLoad(false);
                const data = await axios.get(`https://api.jikan.moe/v4/anime/${animekey}/news`)
                setAnimeNews(data.data.data)
                setLoad(true)
                console.log(animekey)

            }
            catch (error) {
                console.log(error)
            }
        }

        fetchdata();
    }, [animekey])

    if (load) {
        console.log(AnimeNews)
    }

    return (
        <>
            {
                !load && <Loadbar />
            }
            {
                load && <div className='animenewscont'>


                </div>


            }
        </>
    )
}

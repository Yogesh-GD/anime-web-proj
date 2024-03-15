import React from 'react'
import { NavLink } from 'react-router-dom'


export default function Card({anime,theme}) {
    const type=anime.type==='Manga'?"manga":'anime';
    return (
        <div className="w-64 overflow-hidden h-[400px]  rounded-lg my-5 " >
            <NavLink to={`/${type}Detail/${anime.mal_id}/${type}`} onClick={() => localStorage.setItem('animeDetailId', anime.mal_id)} >
                <div className=" h-3/4 overflow-hidden  ">
                    <img src={anime.images.jpg.large_image_url} alt={''} />
                    <span className=''  >{anime.score}</span>
                    <span className=' ab'  >{anime.popularity}</span>
                    <span className=' abs'  >{anime.members}</span>
                </div>
            </NavLink>

            <div className={`p-3 ${theme?" bg-[#D8D8D8]":" bg-[#000]"} h-1/4 text-white`} >
                <div className="flex flex-wrap gap-1">
                    {
                        anime.genres.map((genre, index) => {
                            
                            return (
                                <span className= {` ${theme?"bg-[#909090] text-[#f7f7f7]":" bg-[#2B2B2B] text-[#9B9393]"}  px-2  rounded-xl`}  key={index}>{genre.name}</span>
                            )
                        })
                    }
                </div>
                <div className="pt-1 px-1 text-lg" >

                    <NavLink className={`${theme?"text-[#000]":"text-[#ffffff]"}`} to={`/${type}Detail/${anime.mal_id}/${type}`}  > {anime.title_english}</NavLink>

                </div>
            </div>
        </div>
    )
}

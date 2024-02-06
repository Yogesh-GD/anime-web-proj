import React from 'react'
import { NavLink } from 'react-router-dom'


export default function Card({anime,theme}) {
    return (
        <div className="card" >
            <NavLink to={`/AnimeDetail/${anime.mal_id}`} onClick={() => localStorage.setItem('animeDetailId', anime.mal_id)} >
                <div className="cardimg">
                    <img src={anime.images.jpg.large_image_url} alt={''} />
                    <span style={theme ? { background: '#2d2d2d' } : {}}>{anime.score}</span>
                    <span>{anime.popularity}</span>
                    <span>{anime.members}</span>
                </div>
            </NavLink>

            <div className="cardinfo">
                <div className="geners">
                    {
                        anime.genres.map((genre, index) => {
                            return (
                                <span key={index}>{genre.name}</span>
                            )
                        })
                    }
                </div>
                <div className="cardname" >

                    <NavLink to={`/AnimeDetail/${anime.mal_id}`} style={theme ? { color: '#36BCE5' } : { color: "#E53637" }}  > {anime.title_english}</NavLink>

                </div>
            </div>
        </div>
    )
}

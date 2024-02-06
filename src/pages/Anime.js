import React from 'react'
import Animelist from '../components/Animelist'
export default function Anime() {
    return (
        <div className="Animelistcont maincont" >
            <Animelist api="https://api.jikan.moe/v4/top/anime" title="Anime" />
        </div>
    )
}

import React from 'react'
import MangaList from '../components/MangaList'
export default function Manga() {
    return (
        <div className="Animelistcont maincont" >
            <MangaList api="https://api.jikan.moe/v4/top/manga" title="Manga" />
        </div>
    )
}

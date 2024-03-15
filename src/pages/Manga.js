import React from 'react'
import CategoryCont from '../components/CategoryCont'
import AnimeSearch from '../components/Search'
export default function Manga() {
    return (
        <div className="Animelistcont maincont" >
            <AnimeSearch type={'Manga'} />
            <CategoryCont api="https://api.jikan.moe/v4/top/manga" title="Manga" />
        </div>
    )
}

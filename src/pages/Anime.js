import React from 'react'
import CategoryCont from '../components/CategoryCont'
import Search from '../components/Search'
export default function Anime() {
    return (
        <div className="Animelistcont maincont" >
            <Search type={'Anime'} />
            <CategoryCont api="https://api.jikan.moe/v4/top/anime" title="Anime" />
        </div>
    )
}

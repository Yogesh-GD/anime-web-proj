import React from 'react'
import HomeCont from  '../components/HomeCont'



export default function HomePage() {
    return (
        <>
            <div className="Animelistcont maincont" >
             
                <HomeCont api="https://api.jikan.moe/v4/top/anime" title="Anime" />
                <HomeCont api="https://api.jikan.moe/v4/top/manga" title="Manga" />
            </div>
        </>
    )
}

import React from 'react'
import SlideShow from '../components/SlideShow'
import SlideShow2 from '../components/SlideShow2'
import Manga from '../components/Manga'
import Anime from '../components/Anime'


export default function HomePage() {
    return (
        <>
            <div className="Animelistcont maincont" >
                <SlideShow />
                <SlideShow2 />
                <Anime api="https://api.jikan.moe/v4/top/anime" title="Anime" />
                <Manga api="https://api.jikan.moe/v4/top/manga" title="Manga" />
            </div>
        </>
    )
}

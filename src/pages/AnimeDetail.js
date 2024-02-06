
import React from 'react'
import Recommandation from '../components/AnimeRecommandation';
import Detail from '../components/AnimeInfo';
import { useParams } from 'react-router-dom';
// import AnimeNews from '../components/AnimeNews';

export default function AnimeDetail() {
    const params = useParams();

    return (
        <>
        
                <Detail animekey={params.id} />
                {/* <AnimeNews animekey={params.id}/> */}
                <Recommandation animekey={params.id} />
            
        </>
    )
}

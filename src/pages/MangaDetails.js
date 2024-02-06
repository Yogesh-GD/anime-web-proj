import React from 'react'
import Detail from '../components/MangaInfo';
import Recommandation from '../components/MangaRecommandation';
import { useParams } from 'react-router-dom';

export default function MangaDetails() {
  const params = useParams();
  return (
    <>
        
    <Detail animekey={params.id} />
    <Recommandation animekey={params.id} />

</>
  )
}

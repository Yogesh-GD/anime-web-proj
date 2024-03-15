import React from 'react'
import Detail from '../components/MangaInfo';
import Recommandation from '../components/Recommandation';
import { useParams } from 'react-router-dom';

export default function MangaDetails() {
  const params = useParams();
  return (
    <>
        
    <Detail animekey={params.id} />
    <Recommandation ckey={params.id} type={params.type} />

</>
  )
}

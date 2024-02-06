import React from 'react'
import AnimeSearchResultList from '../components/AnimeSearchResultList';
import { useParams } from 'react-router-dom'


export default function AnimeSearchResult() {
  const params=useParams()
  console.log(params)
  return (
    <div>
      
        <AnimeSearchResultList animekey={params.id}/>
    </div>
  )
}

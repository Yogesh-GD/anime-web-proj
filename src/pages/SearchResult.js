import React from 'react'
import SearchResultList from '../components/SearchList';
import { useParams } from 'react-router-dom'
import Search from '../components/Search';


export default function SearchResult() {
  const params=useParams()
  return (
    <div>
        <Search  type={params.type}/>
        <SearchResultList animekey={params.id} type={params.type}/>
    </div>
  )
}

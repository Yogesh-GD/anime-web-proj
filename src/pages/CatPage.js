import React from 'react'
import CategoryCont from '../components/CategoryCont'
import Search from '../components/Search'
import { useParams } from 'react-router-dom'


function CatPage() {
  const params=useParams();
  return (
    <div>
        <Search type={params.type} />
        <CategoryCont api={`https://api.jikan.moe/v4/top/${params.type.toLocaleLowerCase()}`} title={params.type} />
    </div>
  )
}

export default CatPage
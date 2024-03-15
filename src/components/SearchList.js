import React, { useContext, useEffect, useState } from 'react';
import { themecontext } from '../App';
import axios from 'axios';
import Loadbar from './loadingbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import Card from './Card';



export default function SearchResult({ animekey,type }) {
  const [data, setData] = useState('');
  const [page, setPage] = useState(parseInt(localStorage.getItem('page')))
  const [paginationData, setPaginationData] = useState("")
  const [load, setLoad] = useState(false)
  const [error, setError] = useState('')

  const theme = useContext(themecontext)

  useEffect(() => {
    const fetchdata = async () => {
      try {
        setLoad(false)
        const data = await axios.get(`https://api.jikan.moe/v4/${type}?q=${animekey}?&order_by=title&sort=asc&page=${page}&&limit=10`)
        setData(data.data.data)
        setPaginationData(data.data.pagination)
        setLoad(true)

      }
      catch (error) {
        setError(error.message)
      }
    }

    fetchdata();
  }, [animekey, page])



  const handleNextPage = () => {
    localStorage.setItem('page', page + 1)
    setPage(parseInt(localStorage.getItem('page')));
    setLoad(false)
  }
  const handleprevPage = () => {
    if (page > 1) {
      localStorage.setItem('page', page - 1)
      setPage(parseInt(localStorage.getItem('page')));
      setLoad(false)
    }
  }

  if(error){
    return(
        <div className={`h-96 grid place-items-center text-xl`}>
            {error}
        </div>
    )
}

  return (


    <>
      {!load && <Loadbar />}
      {load && <div className='animetopiclist searchresultlist'>
        <div className={` ${theme ? "bg-[#D8D8D8] border-[#000]" : "bg-[#000000] border-[#6B6767]"} py-2 flex items-center justify-between px-2 mb-2  text-2xl border-l-4     `} >
          <h1>Search</h1>
        </div>
        <div className=" py-4 grid md:grid-cols-2 lg:grid-cols-3 gap-3 xl:grid-cols-4  place-items-center">




          {
            data.map((anime, index) => {
              return (
                <Card anime={anime} theme={theme} key={index} />

              )
            })
          }
        </div>

        <div className={` gap-2 ${theme ? "*:bg-[#909090]" : "*:bg-[#000000]"} flex items-center  sm:justify-between *:cursor-pointer flex-wrap  *:w-10 *:h-10 *:grid *:place-items-center gap-2`}    >

          <span className={` `}
            onClick={handleprevPage}><FontAwesomeIcon icon={faArrowLeft} /></span>

          <span onClick={() => setPage(1)}>1</span>
          <span onClick={() => setPage(page => page + 1)}>{page + 1}</span>
          <span onClick={() => setPage(page => page + 2)}>{page + 2}</span>
          <span onClick={() => setPage(page => page + 3)}>{page + 3}</span>
          <span onClick={() => setPage(page => page + 4)}>{page + 4}</span>
          <span>...</span>
          <span onClick={() => setPage(paginationData.last_visible_page)}>{paginationData.last_visible_page}</span>
          <span className="prevpage" style={
            !paginationData.has_next_page ? { visibility: 'hidden' } : {}
          } onClick={handleNextPage} ><FontAwesomeIcon icon={faArrowRight} /></span>
        </div>

      </div>
      }
    </>
  )
}
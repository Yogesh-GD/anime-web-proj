import React, { useContext, useEffect, useState } from 'react';
import { themecontext } from '../App';
import axios from 'axios';
import Loadbar from './loadingbar';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import Card from './Card';



export default function AnimeSearchResult({ animekey }) {
  const [animeData, setanimeData] = useState('');
  const [page, setPage] = useState(parseInt(localStorage.getItem('page')))
  const [paginationData, setPaginationData] = useState("")
  const [load, setLoad] = useState(false)
  const [error, setError] = useState('')

  const theme = useContext(themecontext)

  useEffect(() => {
    const fetchdata = async () => {
      try {
        setLoad(false)
        const data = await axios.get(`https://api.jikan.moe/v4/anime?q=${animekey}?&order_by=title&sort=asc&page=${page}&&limit=10`)
        setanimeData(data.data.data)
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

  return (


    <>
      {!load && <Loadbar />}
      {load && <div className='animetopiclist searchresultlist'>
        <div className="Animegene" style={theme ? { background: "#000", borderColor: "#36BCE5" } : {}}>
          <h1>Search</h1>
        </div>
        <div className="animelist">




          {
            animeData.map((anime, index) => {
              return (
                <Card anime={anime} theme={theme} key={index} />

              )
            })
          }
        </div>

        <div className="pagination" style={theme ? { color: '#36BCE5' } : { color: "#E53637" }}   >
          <span className="nextpage"
            style={
              (page < 2) ? { visibility: 'hidden' } : {}
            }
            onClick={handleprevPage}><FontAwesomeIcon icon={faArrowLeft} /></span>
          <span>{paginationData.current_page}/{paginationData.last_visible_page}</span>
          <span className="prevpage" style={
            !paginationData.has_next_page ? { visibility: 'hidden' } : {}
          } onClick={handleNextPage} ><FontAwesomeIcon icon={faArrowRight} /></span>
        </div>

      </div>
      }
    </>
  )
}
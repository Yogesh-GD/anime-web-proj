import React, { useContext, useEffect, useState } from 'react'
import Loadbar from './loadingbar';
import { themecontext } from '../App';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import Card from './Card';

export default function MangaList({ api, title }) {
    const [mangaData, setmangaData] = useState('');
    const [paginationData, setPaginationData] = useState("")
    const [load, setLoad] = useState(false)
    const [error, setError] = useState('')

    const [page, setPage] = useState(parseInt(localStorage.getItem('page')))
    const theme = useContext(themecontext)
    const apikey = api
    useEffect(() => {
        const fetchdata = async () => {
            try {
                const data = await axios.get(`${apikey}?page=${page}&limit=12`)
                setmangaData(data.data.data)
                setPaginationData(data.data.pagination)
                setLoad(true)

            }
            catch (error) {
                setError(error.message)
            }
        }

        fetchdata();
    }, [page])

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

            {
                !load && <Loadbar />
            }

            {
                load && <div className="animetopiclist">
                    <div className="Animegene" style={theme ? { background: "#000", borderColor: "#36BCE5" } : {}}>
                        <h1>{title}</h1> <span>VIEW ALL</span>
                    </div>
                    <div className="animelist">




                        {
                            mangaData.map((anime, index) => {
                                return (

                                    <Card anime={anime} theme={theme} key={index}/>

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

import axios from 'axios';
import React, { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react'
import Loadbar from './loadingbar';
import { themecontext } from '../App';
import Card from './Card';
import { NavLink } from 'react-router-dom';


localStorage.setItem('page', 1)
export default function CategoryCont({ api, title }) {
    const [data, setData] = useState('');
    const [paginationData, setPaginationData] = useState("")
    const [load, setLoad] = useState(false)
    const [error, setError] = useState('')
    const [page, setPage] = useState(parseInt(localStorage.getItem('page')))
    const theme = useContext(themecontext)
    const apikey = api
    useEffect(() => {
        const fetchdata = async () => {
            try {
                setLoad(false)
                const data = await axios.get(`${apikey}?page=${page}&limit=12`)
                setData(data.data.data)
                setPaginationData(data.data.pagination)
                setLoad(true)

            }
            catch (error) {
                setError(error.message)
            }
        }

        fetchdata();
    }, [page, apikey,title])

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

            {
                !load && <Loadbar />
            }

            {
                load && <div>
                    <div className={` ${theme ? "bg-[#D8D8D8] border-[#000]" : "bg-[#000000] border-[#6B6767]"} py-2 flex items-center justify-between px-2 mb-2  text-2xl border-l-4     `} >
                        <h1>{title}</h1> <NavLink to={`/${title}`}> <span>{paginationData.current_page}/{paginationData.last_visible_page}</span></NavLink>
                    </div>
                    <div className=" py-4 grid md:grid-cols-2 lg:grid-cols-3 gap-3 xl:grid-cols-4  place-items-center ">
                        {
                            data.map((anime, index) => {
                                return (

                                    <Card anime={anime} theme={theme} key={index} />

                                )
                            })
                        }
                    </div>


                    <div className={` gap-2 ${theme ? "*:bg-[#909090]" : "*:bg-[#000000]"} flex items-center  sm:justify-between *:cursor-pointer flex-wrap  *:w-10 *:h-10 *:grid *:place-items-center gap-2`}    >

                        <span className={``}
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

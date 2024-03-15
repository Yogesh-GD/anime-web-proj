import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react'
import { themecontext } from '../App';
import { NavLink } from 'react-router-dom';
import Loadbar from './loadingbar';



export default function Recommandation({ ckey,type  }) {
    const [recommandationData, setrecommandationData] = useState('');
    const [error, setError] = useState('')
    const [load, setLoad] = useState(false)
    const theme = useContext(themecontext)

    useEffect(() => {
        const fetchdata = async () => {
            try {
                setLoad(false);
                const data = await axios.get(`https://api.jikan.moe/v4/${type}/${ckey}/recommendations`)
                setrecommandationData(data.data.data)
                setLoad(true)

            }
            catch (error) {
                setError(error.message)
            }
        }

        fetchdata();
    }, [ckey,type])

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
                load && <div className='my-10'>
                    <div className={` ${theme?"bg-[#D8D8D8] border-[#000]":"bg-[#000000] border-[#6B6767]"} py-2 flex items-center justify-between px-2 mb-2  text-2xl border-l-4     `}>
                        <h1>Recommandation</h1> <span></span>
                    </div>
                    {
                        recommandationData.length===0&&<div>No Recommandation........</div>
                    }
                    <div className="py-4 grid md:grid-cols-2 lg:grid-cols-3 gap-3 xl:grid-cols-4  place-items-center">
                        {
                            recommandationData.map((data, index) => {
                                return (
                                    
                                        <div className="w-64 overflow-hidden h-[400px]  rounded-lg my-5 " key={index}>
                                            <NavLink to={`/${type}Detail/${data.entry.mal_id}/${type}`} style={theme ? { color: '#36BCE5' } : { color: "#E53637" }} onClick={() => { localStorage.setItem('animeDetailId', data.entry.mal_id) }} >
                                                <div className=" h-3/4 overflow-hidden  ">
                                                    <img className='w-full ' src={data.entry.images.jpg.image_url} alt="" />
                                                </div>
                                            </NavLink>

                                            <div className={`p-3 ${theme?" bg-[#D8D8D8]":" bg-[#000]"} h-1/4 text-white`}>
                                                <NavLink className={`${theme?"text-[#000]":"text-[#ffffff]"}`} to={`/${type}Detail/${data.entry.mal_id}/${type}`}  > {data.entry.title}</NavLink>
                                            </div>
                                        </div>
                                    
                                )
                            })
                        }
                    </div>
                </div>
            }
        </>
    )
}

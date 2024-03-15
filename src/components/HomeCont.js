import React, { useContext, useEffect, useState } from 'react'
import Loadbar from './loadingbar';
import { themecontext } from '../App';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import Card from './Card';

export default function HomeCont({ api, title }) {
    const [data, setData] = useState('');
    const [load, setLoad] = useState(false)
    const [error, setError] = useState('')

    const theme = useContext(themecontext)
    const apikey = api
    useEffect(() => {
        const fetchdata = async () => {
            try {
                const page=1
                const data = await axios.get(`${apikey}?page=${page}&limit=12`)
                setData(data.data.data)
                setLoad(true)

            }
            catch (error) {
                setError(error.message)
            }
        }

        fetchdata();
    }, [apikey])

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
                load && <div >
                    <div className={` ${theme?"bg-[#D8D8D8] border-[#000]":"bg-[#000000] border-[#6B6767]"} py-2 flex items-center justify-between px-2 mb-2  text-2xl border-l-4     `} >
                        <h1>{title}</h1> <NavLink to={`/${title}`}><span className='text-lg'>VIEW ALL</span></NavLink>
                    </div>
                    <div className=" py-4 grid md:grid-cols-2 lg:grid-cols-3 gap-3 xl:grid-cols-4  place-items-center ">




                        {
                            data.map((anime, index) => {
                                return (

                                   <Card anime={anime} theme={theme} key={index}/>

                                )
                            })
                        }


                    </div>



                </div>
            }
        </>
    )

}

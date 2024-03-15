import React, { useContext } from "react";
import { themecontext } from "../App";


export default function Loadbar(){
    const theme=useContext(themecontext)
        return(
            <>
            <div className=" flex h-screen justify-center items-center">
                <div className={` w-14 h-14 rounded-full  ${theme?'border-[#000000]':'border-[#ffffff]'} animate-spin border-x-4 `}></div>
            </div>
            </>
        )
}
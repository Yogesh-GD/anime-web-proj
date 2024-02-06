import React, { useContext } from 'react'
import { themehandlecontext } from '../App'

export default function () {

  const themeHandle = useContext(themehandlecontext)


  return (
    <div className='darkmode'>
      <input type="checkbox" id="darkmode" onChange={() => themeHandle()} />
      <label htmlFor="darkmode"></label>
    </div>
  )
}

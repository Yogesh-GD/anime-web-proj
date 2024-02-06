import React, { useState } from 'react'

const imagecont = [
    {
        img: './slideimg1.png'
    },
    {
        img: './slideimg2.png'
    },
    {
        img: './slideimg3.png'
    },
    {
        img: './slideimg4.jpg'
    }
]

export default function SlideShow() {
    const [currentslide, setSlide] = useState(0)
    const slidelen = imagecont.length;
     setTimeout(() => {
         setSlide(()=>currentslide===slidelen-1?0:currentslide+1)
      }, 5000);

    return (
        <>
            <div className="slideshowcont">
                {imagecont.map((img, index) => {
                    return (
                        <div  key={index}>
                             {currentslide === index && 
                                <img src={img.img} alt="" />
                          }

                        </div>
                    )
                })}
            </div>
        </>
    )
}

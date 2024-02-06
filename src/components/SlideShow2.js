import React from 'react'

const imagecont = [
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
export default function SlideShow2() {
    return (
        <>
            <div className="slideshowcontainer">
                {imagecont.map((img, index) => {
                    return (
                       
                            <div className="slider" key={index}>
                                <img src={img.img} alt="" />
                            </div>
                       
                    )
                })}
            </div>
        </>
    )
}

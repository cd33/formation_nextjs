import React from 'react'
import Image from 'next/image'
import img1 from '../public/assets/img1.jpg'
import img2 from '../public/assets/img2.jpg'
import img3 from '../public/assets/img3.jpg'

export default function gallery() {
  return (
    <>
        <Image placeholder="blur" layout="responsive" alt="" src={img1} />
        <Image placeholder="blur" layout="responsive" alt="" src={img2} />
        <Image placeholder="blur" layout="responsive" alt="" src={img3} />
    </>
  )
}

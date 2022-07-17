import Link from 'next/link'
import React from 'react'

export default function index() {
    return (
        <>
        <h1>blog</h1>
        <Link href={'/blog/les 10 meilleurs articles'}>
            <a>les 10 meilleurs articles</a>
        </Link>
        </>
        
    )
}
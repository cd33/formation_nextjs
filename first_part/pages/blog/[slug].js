import React from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'

export default function Article() {
  const router = useRouter()

  console.log('router :>> ', router)

  const pushFunction = () => router.push('/')

  return (
    <>
      <Head>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{router.query.slug}</title>
      </Head>
      <h1>{router.query.slug}</h1>
      <button onClick={pushFunction}>RETOUR ACCUEIL</button>
    </>
  )
}

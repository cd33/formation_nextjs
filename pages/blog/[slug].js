import React from 'react'
import { useRouter } from 'next/router'

export default function Article() {
  const router = useRouter()

  console.log('router :>> ', router)

  const pushFunction = () => router.push("/")
 
  return (
    <>
      <h1>{router.query.slug}</h1>
      <button onClick={pushFunction}>RETOUR ACCUEIL</button>
    </>
  )
}

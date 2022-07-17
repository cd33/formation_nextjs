import React from 'react'

export default function cours({ results }) {
  return (
    <div className="container">
      <h1>
        Le BTC est à : {results.bpi.EUR.rate}€
      </h1>
    </div>
  )
}

export async function getServerSideProps(context) {
  console.log('context', context)

  const data = await fetch('https://api.coindesk.com/v1/bpi/currentprice.json')
  const results = await data.json()

  return {
    props: {
      results,
    },
  }
}

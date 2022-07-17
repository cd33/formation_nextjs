import { useEffect, useState } from 'react'

export default function Random() {
  const [data, setData] = useState()

  useEffect(() => {
    newWord()
  }, [])
  
  const newWord = () => {
    fetch('/api/vocapi')
      .then((response) => response.json())
      .then((data) => setData(data))
  }

  let randomWord;
  if(data) {
    const array = data.englishList[0].words
    randomWord = array[Math.floor(Math.random() * array.length)].en
  }

  return (
    <div className="container">
      <h1>Mot au hasard</h1>
      <button onClick={newWord}>Get Random Word</button>
      <p>{randomWord}</p>
    </div>
  )
}

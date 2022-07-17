import { useEffect, useRef, useState } from 'react'

export default function Add() {
  const enWord = useRef()
  const frWord = useRef()

  const handleSubmit = (e) => {
    e.preventDefault()

    const newWord = {
      en: enWord.current.value,
      fr: frWord.current.value,
    }

    fetch('/api/vocapi', {
      method: 'POST',
      body: JSON.stringify(newWord),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('data :>> ', data)
      })
    enWord.current.value = ''
    frWord.current.value = ''
  }

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        {/* <label htmlFor='addEn'>
                Ajouter un mot en Anglais
            </label>
            <input></input> */}
        <div className="grid">
          <label htmlFor="addEn">
            Ajouter un mot en Anglais
            <input
              ref={enWord}
              type="text"
              id="addEn"
              name="addEn"
              placeholder="Mot en Anglais"
              required
            />
          </label>
          <label htmlFor="addFr">
            Ajouter un mot en Français
            <input
              ref={frWord}
              type="text"
              id="addFr"
              name="addFr"
              placeholder="Mot en Français"
              required
            />
          </label>
        </div>
        <button type="submit">Ajouter</button>
      </form>
    </div>
  )
}

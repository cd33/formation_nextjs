import React from 'react'
import Link from 'next/link'
import styles from './Navbar.module.css'

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <Link href="/">
        <a>Accueil</a>
      </Link>
      <Link href="/lists">
        <a>Listes</a>
      </Link>
      <Link href="/isr">
        <a>ISR</a>
      </Link>
      <Link href="/cours">
        <a>BTC</a>
      </Link>
      <Link href="/random">
        <a>Random</a>
      </Link>
      <Link href="/add">
        <a>Add (POST)</a>
      </Link>
    </nav>
  )
}

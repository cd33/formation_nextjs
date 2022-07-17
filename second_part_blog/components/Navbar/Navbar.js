import React from 'react'
import Link from 'next/link'
import styles from './Navbar.module.css'

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <ul>
        <li>
          <Link href="/">
            <a>Carlito.io</a>
          </Link>
        </li>
      </ul>
      <ul>
        <li>
          <Link href="/blog">
            <a>Blog</a>
          </Link>
        </li>
        <li>
          <Link href="/lists">
            <a>Utilisateurs</a>
          </Link>
        </li>
      </ul>
    </nav>
  )
}

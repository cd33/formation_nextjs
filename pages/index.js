import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import Navbar from '../components/Navbar/Navbar'

export default function Home() {
  const id = 'article'
  return (
    <div className={styles.container}>
      <h1>HELLO NEXT JS !</h1>
    </div>
  )
}

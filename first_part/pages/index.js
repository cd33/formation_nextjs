import Head from 'next/head'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <>
      <Head>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Le blog de Carlito</title>
      </Head>
      <div className={styles.container}>
        <h1>HELLO NEXT JS !</h1>
      </div>
    </>
  )
}

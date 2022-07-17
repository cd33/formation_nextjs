import Head from 'next/head'
import styles from '../styles/Home.module.css'

export default function Home(props) {

  return (
    <>
      <Head>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Le blog de Carlito</title>
      </Head>
      <div className={styles.container}>
        <h1 className={styles.titre}>Vocabulaire de base</h1>
        <table className={styles.tableau}>
          <tbody>
            {props.array.map((voc, i) => (
              <tr key={i}>
                <td>{voc.en}</td>
                <td>{voc.fr}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

export async function getStaticProps() {
  const data = await import(`/data/vocabulary.json`)
  const array = data.vocabulary

  if (array.length === 0) {
    return {
      // notFound: true
      redirect: {
        destination: "/isr"
      }
    }
  }

  return {
    props: {
      array // array : array
    }
  }
}

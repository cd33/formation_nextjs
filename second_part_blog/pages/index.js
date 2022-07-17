import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Home.module.css'

export default function Home(props) {
  return (
    <>
      <Head>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Le blog de Carlito</title>
      </Head>
      <div className="container">
        <h1 className={styles.titre}>Bienvenue sur Carlito.io</h1>
        <div className={styles.container_row}>
        <article id="article" className={styles.card}>
            <h2>Lisez les articles</h2>
            <p>
              Nullam dui arcu, malesuada et sodales eu, efficitur vitae dolor.
              Sed ultricies dolor non ante vulputate hendrerit. Vivamus sit amet
              suscipit sapien.
            </p>
            <footer>
                <Link href="/blog">
                  <a>Visitez le blog !</a>
                </Link>
            </footer>
          </article>
          <article id="article" className={styles.card}>
            <h2>Liste des membres</h2>
            <p>
              Nullam dui arcu, malesuada et sodales eu, efficitur vitae dolor.
              Sed ultricies dolor non ante vulputate hendrerit. Vivamus sit amet
              suscipit sapien.
            </p>
            <footer>
              <small>
                <Link href="/lists">
                  <a>Découvrez la liste !</a>
                </Link>
              </small>
            </footer>
          </article>
        </div>
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
        destination: '/isr',
      },
    }
  }

  return {
    props: {
      array, // array : array
    },
  }
}

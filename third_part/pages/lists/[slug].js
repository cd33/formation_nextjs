import { v4 as uuidv4 } from 'uuid'
import { useRouter } from 'next/router'
import styles from '../../styles/Home.module.css'

export default function Word({ array }) {
  const router = useRouter()
  const name = router.query.slug

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }

  return (
    <div className="container">
      <h1>{capitalizeFirstLetter(name)}</h1>
      <table className={styles.tableau}>
        <thead>
          <tr>
            <th>English</th>
            <th>French</th>
          </tr>
        </thead>
        <tbody>
          {array.map((el) => (
            <tr key={uuidv4()}>
              <td>{capitalizeFirstLetter(el.en)}</td>
              <td>{capitalizeFirstLetter(el.fr)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export async function getStaticPaths() {
  const data = await import('/data/lists.json')
  const paths = data.englishList.map((el) => ({
    params: { slug: Object.keys(el)[0] },
  }))

  return {
    // paths: [{ params: { slug: 'words' } }],
    paths,
    fallback: false,
  }
}

export async function getStaticProps(context) {
  const liste = context.params.slug
  const data = await import('/data/lists.json')
  const array = data.englishList.find((list) => Object.keys(list)[0] === liste)

  return {
    props: {
      array: array[liste],
    },
  }
}

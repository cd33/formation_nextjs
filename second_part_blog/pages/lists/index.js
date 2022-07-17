import Link from 'next/link'
import { v4 as uuidv4 } from 'uuid'
import styles from '../../styles/List.module.css'

export default function Lists({ array }) {
  return (
    <div className={styles.container}>
      <h1>Liste des Utilisateurs</h1>
      <ul>
        {array.map((el) => (
          <li key={uuidv4()}>
            <span>{el.name}</span>
            <Link href={`/lists/${el.id}`}>
              <a>Contacter</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export async function getStaticProps() {
  const data = await fetch("https://jsonplaceholder.typicode.com/users")
  const array = await data.json()

  if (array.length === 0) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      array,
    },
  }
}

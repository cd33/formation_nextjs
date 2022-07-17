import Link from 'next/link'
import { v4 as uuidv4 } from 'uuid'

export default function Lists({ array }) {
  return (
    <div className="container">
      <h1>Liste de Vocabulaire</h1>
      <ul>
        {array.map((el) => (
          <li key={uuidv4()}>
            <Link href={`/lists/${Object.getOwnPropertyNames(el)}`}>
              <a>{Object.keys(el)[0]}</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export async function getStaticProps() {
  const data = await import('/data/lists.json')
  const array = data.englishList

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

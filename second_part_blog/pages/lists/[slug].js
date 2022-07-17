import styles from '../../styles/List.module.css'

export default function Word({ arrayUser }) {
  return (
    <div className={styles.container_card}>
      <div className={styles.card}>
        <h4>{arrayUser.name}</h4>
        <h5>Username: {arrayUser.username}</h5>
        <ul>
          <li>Email: {arrayUser.email}</li>
          <li>Site Web: {arrayUser.website}</li>
          <li>Téléphone: {arrayUser.phone.substring(0,14)}</li>
        </ul>
      </div>
    </div>
  )
}

export async function getStaticPaths() {
  const data = await fetch('https://jsonplaceholder.typicode.com/users')
  const array = await data.json()
  const paths = array.map((el) => ({
    params: { slug: el.id.toString() },
  }))

  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps(context) {
  const userId = context.params.slug
  const data = await fetch('https://jsonplaceholder.typicode.com/users')
  const array = await data.json()

  if (array.length === 0) {
    return {
      notFound: true,
    }
  }

  const arrayUser = array.find((user) => user.id == userId)
  return {
    props: {
      arrayUser,
    },
  }
}

import styles from '../../styles/Blog.module.css'

export default function Article({arrayArticle}) {
  return <div className={styles.article_body}>
    <h1>{arrayArticle.title}</h1>
    <p>{arrayArticle.body}</p>
  </div>
}

export async function getStaticPaths() {
  const data = await fetch('https://jsonplaceholder.typicode.com/posts')
  const array = await data.json()

  const paths = array.map((article) => ({
    params: { slug: article.id.toString() },
  }))

  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps(context) {
  const articleId = context.params.slug
  const data = await fetch('https://jsonplaceholder.typicode.com/posts')
  const array = await data.json()

  if (array.length === 0) {
    return {
      notFound: true,
    }
  }

  const arrayArticle = array.find(article => article.id == articleId)
  return {
    props: {
        arrayArticle,
    },
  }
}

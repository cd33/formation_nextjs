import React from 'react'
import Link from 'next/link'
import { v4 as uuidv4 } from 'uuid'
import styles from '../../styles/Blog.module.css'

export default function Blog({ array }) {
  return (
    <div className="container">
      <h1>Bienvenue sur le Blog</h1>
      <p>Voici les articles</p>
      <div className={styles.article_container}>
      {array.map((article) => (
        <article key={uuidv4()} id="article" className={styles.card}>
          <h6>{article.title}</h6>
          <p>{article.body.length > 50 ? article.body.substring(0,50)+"..." : article.body}</p>
            <Link href={`/blog/${article.id}`}>
              <a>Lire cet article</a>
            </Link>
        </article>
      ))}
      </div>
    </div>
  )
}

export async function getStaticProps() {
  const data = await fetch('https://jsonplaceholder.typicode.com/posts')
  const array = await data.json()

  return {
    props: {
      array,
    },
  }
}

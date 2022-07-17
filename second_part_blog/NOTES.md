### Commandes
// simuler l'app sur serveur
```
npm run build
npm run start
```

### getStaticProps
Si vous exportez une fonction appelée getStaticProps (génération de sites statiques) à partir d'une page, Next.js effectuera un pré-rendu de cette page au moment de la construction en utilisant les props retournés par getStaticProps.
```
export async function getStaticProps(context) {
  return {
    props : {}, // sera transmis au composant de la page en tant que props
  }
}
```

### ISR (Incremental static generation)
Si on veux tous les X temps aller chercher des données
Avec revalidate: X, l'appel sera relancé tous les X secondes
```
export async function getStaticProps() {
    const quote = await fetch("https://goquotes-api.herokuapp.com/api/v1/random?count=1")
    const data = await quote.json()

    return {
        props: {
            data
        },
        revalidate: 20
    }
}
```

### Propriétés notFound et redirect
Si l'appel API ne renvoie rien, on peut renvoyer vers le 404 en utilisant 
Ou renvoyer vers une page choisie avec
```
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
      array
    }
  }
}
```

### Pages dynamiques et getStaticPaths
Donne a next le nombre de chemin à créer en fonction du nombre de page que je veux avoir, obligatoire !
```
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
```
Fallback à true si on a des pages peu consultées que l'on ne veut pas précharger, ses pages ne sont pas dans le paths
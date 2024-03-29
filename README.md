# Mémo
## JS et React Rappels
### let const var: 
var a un scope (portée) plus élevé on peut la retrouver partout, dangereux de nombreux conflit, meilleur utiliser const ou let (const non modifiable, exception: si un objet, son intérieur modifiable)

### Spead:
...tab pour récupérer l'ensemble d'un tableau.
```
tab= [1,2], newTab = [...tab, 3]
```

### Rest:
```
function toto(args) {
    for (const arg of args) { console.log(arg) }
}
toto(1,2)
Retour: 1, 2
```
Le reste des arguments inconnus

### HOF, Fonction d'ordre sup:
C'est une fonction qui a une fonction en paramètre, qui retourne une fonction ou les deux
```
raw = [5,6,253,4654]
fct supArr(arr,fn) {
    for (let i = 0; i< arr.length; i++) {
        if(fn(arr[i])) { console.log(arr[i]) }
    }
}
supArr(raw, (item) => {
    if (item>100) return item
})
```

### Methodes Tab:
map retourne un nouveau tableau à partir d'un tableau originel
filter retourne un nouveau tableau filtré par une condition
forEach ne retourne pas un nouveau tableau comme map, utilisé souvent pour faire une action sur les différents élément du tableau 
```
arr = [1,2,3,4,5,6]
mapedArr = arr.map(x => x+10)
filteredArr = arr.filter(x > 2)
arr.forEach(x => console.log(x-90))
```

### Input controlé:
Input prend la valeur du state et modifie le state onchange, utile pour prévisualiser une création avant publication
```
const [inpData, setInpData] = useState()
const handleInput = (e) => setInpData(e.target.value)
<form>
    <label htmlFor="nom">Votre prénom</label>
    <input id="nom" type="text" value={inpData} onChange={handleInput} />
    <button>Valider</button>
</form>
```

### Input non controlé:
Utilisation des ref
```
const [inpData, setInpData] = useState()
const inpRef = useRef()
const handleForm = e =>  {
    e.preventDefault() // évite de recharger la page
    setInpData(inpRef.current.value )
}
<form onSubmit={handleForm}>
    <label htmlFor="nom">Votre prénom</label>
    <input ref={inpRef} id="nom" type="text" />
    <button>Valider</button>
</form>
```

### Context:
Permet de partager un state dans toute l'app (comme redux mais natif)
```
export const DataContext = createContext()
const ContextProvider = props => {
    const [data, setData] = useState("toto")
    return (
        <DataContext.Provider value={{data}}>
            {props.children}
        </DataContext.Provider>
    )
}
export default ContextProvider
```
Dans index.js englober l'App avec ContextProvider
* Pour récupérer la valeur
```
const {data} = useContext(DataContext)
```

## Next.js
### Commandes
* Créer App: 
```
npx create-next-app mon-app
```
* Lancer l'app en dev
```
npm run dev
```
* Simuler l'app sur serveur
```
npm run build
npm run start
```

### Routing
Dossier "pages" contient toutes les pages de notre app, quelques règles:
* index.js est l'accueil du dossier
* 404.js pour une page 404 personnalisée
* _app.js sert a créer toutes nos pages, ne pas toucher à container et component mais on peut l'englober avec une navbar par exemple
* possibilité de créer des sous dossier ex: dossier "blog", /blog/article
* nom dynamique: [slug].js et [...slug] pour un autre slash
* dossier avec un nom dynamic [profil]

### CSS
Dans "styles", globals.css impacte toute l'app  
Pour une page en particulier Navbar.module.css  
Dans le css, toujours commencer par une classe, .navbar {...} .navbar a {...}  
Dans le component, className={styles.navbar}  

### Framework CSS
```
npm i @chakra-ui/react @emotion/react @emotion/styled framer-motion  
```
Dans _app.js : 
```
import { ChakraProvider } from '@chakra-ui/react'
```

### Head différent par page (SEO)
```
import Head from 'next/head'
<Head>
    <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Le blog de Carlito</title>
</Head>
```

### Optimisation des Images (SEO, LazyLoading)
```
import Image from 'next/image'
<Image placeholder="blur" layout="responsive" alt="" src={img1} />
```

### _document.js
Peut mettre à jour les balises <html> et <body> utilisées pour le rendu d'une page. Ce fichier n'est rendu que sur le serveur, de sorte que les gestionnaires d'événements comme onClick ne peuvent pas être utilisés dans _document.
```
import Document, {Html, Head, Main, NextScript} from "next/document"
class MyDocument extends Document {
    render(){
        return (
            <Html lang="en">
                <Head />
                <body className="bg-white">
                    <Main />
                    <NextScript />
                    <div className="modal">Hello World</div>
                </body>
            </Html>
        )
    }
}
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

### Rendu coté serveur
Page crée à chaque fois coté serveur puis envoyé au client
```
export async function getServerSideProps(context) {
  console.log('context', context)

  const data = await fetch('https://api.coindesk.com/v1/bpi/currentprice.json')
  const results = await data.json()

  return {
    props: {
      results,
    },
  }
}
```
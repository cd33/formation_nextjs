import Link from 'next/link'

export default function Error404() {
  return (
    <div className="container">
      <h1>Error 404 !!!</h1>
      <Link href='/'><h1><a>Home</a></h1></Link>
    </div>
  )
}

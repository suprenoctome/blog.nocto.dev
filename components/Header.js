import Link from 'next/link'

export default function Header() {
  return (
    <header>
      <div className='container'>
        <Link href='/' passHref>
          <h2>nocto.dev</h2>
        </Link>
        <Link href='https://nocto.dev' passHref>
          <h4 className='main-site'>main site</h4>
        </Link>
      </div>
    </header>
  )
}
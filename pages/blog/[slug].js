import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import Head from 'next/head'
import { marked } from 'marked'
import Link from 'next/link'

export default function PostPage({
  frontmatter: { title, date, cover_image },
  slug,
  content,
}) {
  return (
    <>
      <Head>
        <title>{title} @ nocto.dev</title>
      </Head>
      <div className='card card-page'>
        <h1 className='post-title'>{title}</h1>
        <div className='post-date'>Posted on {date}</div>
        <div className='post-body'>
            <div dangerouslySetInnerHTML={{ __html: marked(content) }}></div>
        </div>
      </div>
      <Link href='/'>
        <a className='btn btn-back'>Go Back</a>
      </Link>
    </>
  )
}

export async function getStaticPaths() {
  const files = fs.readdirSync(path.join('posts'))

  const paths = files.map((filename) => ({
    params: {
      slug: filename.replace('.md', ''),
    },
  }))

  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params: { slug } }) {
  const markdownWithMeta = fs.readFileSync(
    path.join('posts', slug + '.md'),
    'utf-8'
  )

  const { data: frontmatter, content } = matter(markdownWithMeta)

  return {
    props: {
      frontmatter,
      slug,
      content,
    },
  }
}
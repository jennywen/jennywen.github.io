import ReactMarkdown from "react-markdown"
import { getPostData, getSortedPostsData, getNextPost } from "../lib/api"
import { formatDate } from "../lib/utils"
import Link from "next/link"
import Image from "next/image"
import type { Metadata } from "next"
import PageLayout from '@/components/PageLayout'
import { notFound } from 'next/navigation'
import remarkGfm from 'remark-gfm'
import MDXImage from '@/components/MDXImage'
import ImageGrid from '@/components/ImageGrid'





export async function generateStaticParams() {
  const posts = getSortedPostsData()
  return posts.map((post) => ({
    id: post.id,
  }))
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const postData = getPostData(params.id)
  return {
    title: postData.title,
    description: postData.description,
    keywords: postData.keywords,
    openGraph: {
      title: postData.title,
      description: postData.description,
      type: "article",
      publishedTime: postData.date,
      authors: ["Your Name"],
    },
    twitter: {
      card: "summary_large_image",
      title: postData.title,
      description: postData.description,
    },
  }
}

export default async function BlogPost({ params }: { params: { id: string } }) {
  const post = await getPostData(params.id)
  const nextPost = getNextPost(params.id)

  if (!post) {
    notFound()
  }

  return (
    <PageLayout>
      <article className="xl:mr-50 lg:mr-30 md:mr-20 max-w-prose blog bg-white text-black dark:bg-black dark:text-white">
        <h1 className="text-4xl mb-24 mt-4 font-serif font-semibold tracking-tight">
          <Link href="/notes" className="text-black no-underline hover:text-gray-800 hover:no-underline dark:text-white dark:hover:text-gray-300">
            <span className="font-bold">Jenny Wen</span> — Notes
          </Link>
        </h1>
        <div className="text-gray-500 dark:text-gray-400">{formatDate(post.date)}</div>
        <h1 className='text-5xl mt-4 leading-tight font-bold font-serif mb-8 leading-none dark:text-white'>{post.title}</h1>
        {post.image && (
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-[400px] object-cover rounded-lg mb-8 dark:bg-gray-800"
          />
        )}
        <div
          className="prose max-w-none text-black text-lg dark:text-gray-200 dark:prose-invert"
          dangerouslySetInnerHTML={{ __html: post.contentHtml }}
        />

        
        <div className="mt-8 pt-8 mb-12">
          <div className="flex justify-between items-center mb-4">
            <Link href="/notes" className="text-black font-medium hover:underline dark:text-white dark:hover:text-gray-200">
              Back to all notes
            </Link>
          </div>

          {/* {nextPost && (
            <div className="mt-6 w-2/3">
              <div className="text-lg text-gray-500 font-regular dark:text-gray-400">Keep reading</div>
              <Link 
                href={`/notes/${nextPost.id}`}
                className="group no-underline dark:text-blue-400"
              >
                <h4 className="text-xl font-medium mb-2 no-underline dark:text-white">
                  {nextPost.title}
                </h4>
                <p className="text-gray-600 line-clamp-4 dark:text-gray-300">
                  {nextPost.description}
                </p>
              </Link>
            </div> */}
          {/* )} */}
        </div>
      </article>
    </PageLayout>
  )
}


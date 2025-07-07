import Parser from 'rss-parser';
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
import parse, { domToReact, HTMLReactParserOptions, Element } from 'html-react-parser'

async function getSubstackPostBySlug(slug: string) {
  const parser = new Parser();
  const feed = await parser.parseURL('https://jennywen.substack.com/feed');
  const item = feed.items.find(item => (item.link?.split('/').filter(Boolean).pop() || '') === slug);
  if (!item) return null;
  const content = item['content:encoded'] || item.content || '';
  const heroImage = (() => {
    const match = content.match(/<img[^>]+src=["']([^"'>]+)["']/i);
    return match ? match[1] : null;
  })();
  return {
    title: item.title || '',
    date: item.pubDate || '',
    contentHtml: content,
    image: heroImage,
    description: item.summary || '',
    keywords: '',
    isSubstack: true,
  };
}

export async function generateStaticParams() {
  const posts = getSortedPostsData()
  return posts.map((post) => ({
    id: post.id,
  }))
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  // Try local note first
  try {
    const postData = await getPostData(params.id)
    return {
      title: `Jenny Wen — ${postData.title}`,
      description: (postData as any).description?.toString() || '',
      keywords: (postData as any).keywords?.toString() || '',
      openGraph: {
        title: `Jenny Wen — ${postData.title}`,
        description: (postData as any).description?.toString() || '',
        type: "article",
        publishedTime: postData.date,
        authors: ["Your Name"],
      },
      twitter: {
        card: "summary_large_image",
        title: `Jenny Wen — ${postData.title}`,
        description: (postData as any).description?.toString() || '',
      },
    }
  } catch {
    // Try Substack
    const substack = await getSubstackPostBySlug(params.id)
    if (substack) {
      return {
        title: `Jenny Wen — ${substack.title}`,
        description: substack.description?.toString() || '',
        openGraph: {
          title: `Jenny Wen — ${substack.title}`,
          description: substack.description?.toString() || '',
          type: "article",
          publishedTime: substack.date,
          authors: ["Jenny Wen"],
        },
        twitter: {
          card: "summary_large_image",
          title: `Jenny Wen — ${substack.title}`,
          description: substack.description?.toString() || '',
        },
      }
    }
    return { title: 'Not found', description: '' }
  }
}

const substackParserOptions: HTMLReactParserOptions = {
  replace: (domNode) => {
    // @ts-ignore
    if (
      domNode &&
      domNode.type === 'tag' &&
      domNode.name === 'div' &&
      domNode.attribs &&
      domNode.attribs.class &&
      domNode.attribs.class.includes('image-gallery-embed') &&
      domNode.attribs['data-attrs']
    ) {
      try {
        const attrs = JSON.parse(domNode.attribs['data-attrs']);
        const gallery = attrs.gallery;
        if (gallery && Array.isArray(gallery.images)) {
          return (
            <div className="substack-gallery">
              {gallery.images.map((img: any, i: number) => (
                <img
                  key={i}
                  src={img.src}
                  alt={gallery.alt || ''}
                />
              ))}
            </div>
          );
        }
      } catch (e) {
        // fail silently
      }
    }
    return undefined;
  }
};

export default async function BlogPost({ params }: { params: { id: string } }) {
  // Try local note first
  let post = null;
  let isSubstack = false;
  try {
    const local = await getPostData(params.id)
    post = {
      title: local.title,
      date: local.date,
      contentHtml: local.contentHtml,
      image: local.image || '',
      description: (local as any).description || '',
      keywords: (local as any).keywords || '',
      isSubstack: false,
    }
  } catch {
    // Try Substack
    const substack = await getSubstackPostBySlug(params.id)
    if (substack) {
      post = substack
      isSubstack = true;
    }
  }

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
        <div className="text-gray-500 dark:text-gray-400">
          {(() => {
            const d = new Date(post.date);
            return isNaN(d.getTime()) ? '' : d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
          })()}
        </div>
        <h1 className='text-5xl mt-4 leading-tight font-bold font-serif mb-8 dark:text-white'>{post.title}</h1>
        {/* Only show image for local notes, not Substack posts */}
        {post.image && !post.isSubstack && ((post.description !== '' || post.keywords !== '') ? (
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-[400px] object-cover rounded-lg mb-8 dark:bg-gray-800"
          />
        ) : null)}
        <div
          className="prose max-w-none text-black text-lg dark:text-gray-200 dark:prose-invert"
        >
          {post.isSubstack
            ? parse(post.contentHtml, substackParserOptions)
            : <span dangerouslySetInnerHTML={{ __html: post.contentHtml }} />}
        </div>
        <div className="mt-8 pt-8 mb-12">
          <div className="flex justify-between items-center mb-4">
            <Link href="/notes" className="text-black font-medium hover:underline dark:text-white dark:hover:text-gray-200">
              Back to all notes
            </Link>
          </div>
        </div>
      </article>
    </PageLayout>
  )
}


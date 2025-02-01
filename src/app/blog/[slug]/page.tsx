import ReactMarkdown from "react-markdown"
import { getPostData, getSortedPostsData } from "../../../lib/api"
import Link from "next/link"
import { notFound } from "next/navigation"
import type { Metadata } from "next"

interface PostParams {
    params: {
        slug: string;
    };
}

export async function generateStaticParams() {
    const posts = getSortedPostsData()
    return posts.map((post) => ({
        slug: post.id,
    }))
}

export async function generateMetadata({ params }: PostParams): Promise<Metadata> {
    const post = getPostData(params.slug)
    
    if (!post) {
        return {
            title: 'Post Not Found',
            description: 'The requested blog post could not be found.'
        }
    }

    return {
        title: post.title,
        description: post.description,
        openGraph: {
            title: post.title,
            description: post.description,
            type: "article",
            publishedTime: post.date,
            authors: ["Your Name"],
        },
        twitter: {
            card: "summary_large_image",
            title: post.title,
            description: post.description,
        },
    }
}

export default function Post({ params }: PostParams) {
    const post = getPostData(params.slug)

    if (!post) {
        notFound()
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <main className="container mx-auto px-4 py-16">
                <div className="max-w-3xl mx-auto">
                    <Link 
                        href="/blog"
                        className="inline-flex items-center text-sm text-gray-600 hover:text-blue-600 mb-8 group"
                    >
                        <svg 
                            className="w-3 h-3 mr-2 group-hover:-translate-x-1 transition-transform" 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                d="M15 19l-7-7 7-7" 
                            />
                        </svg>
                        <span>Back to all posts</span>
                    </Link>

                    <article className="bg-white rounded-xl shadow-sm p-8 md:p-12">
                        <header className="mb-8">
                            <time className="text-sm text-gray-500 block mb-2">
                                {post.date}
                            </time>
                            <h1 className="text-4xl font-bold text-gray-900">
                                {post.title}
                            </h1>
                        </header>

                        <div className="prose prose-slate max-w-none">
                            <ReactMarkdown>{post.content || ''}</ReactMarkdown>
                        </div>
                    </article>
                </div>
            </main>
        </div>
    )
} 
import Link from "next/link"
import { getSortedPostsData } from "../../lib/api"

export default function Blog() {
    const allPostsData = getSortedPostsData()

    return (
        <div className="min-h-screen bg-gray-50">
            <main className="container mx-auto px-4 py-16">
                <div className="max-w-3xl mx-auto">
                    <header className="mb-12">
                        <h1 className="text-5xl font-bold text-gray-900 mb-4">Blog</h1>
                        <p className="text-xl text-gray-600">Thoughts on design, technology, and life.</p>
                    </header>
                    
                    <div className="space-y-8">
                        {allPostsData.map((post) => (
                            <article 
                                key={post.id} 
                                className="group hover:bg-white hover:shadow-lg rounded-xl p-6 transition-all duration-200"
                            >
                                <time className="text-sm text-gray-500 mb-2 block">
                                    {post.date}
                                </time>
                                <h2 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                                    {post.title}
                                </h2>
                                <p className="text-gray-600 leading-relaxed mb-4">
                                    {post.description}
                                </p>
                                <Link 
                                    href={`/blog/${post.id}`}
                                    className="inline-flex items-center text-blue-600 hover:text-blue-800"
                                >
                                    <span className="text-sm font-medium">Read more</span>
                                    <svg 
                                        className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" 
                                        fill="none" 
                                        viewBox="0 0 24 24" 
                                        stroke="currentColor"
                                        strokeWidth={2}
                                    >
                                        <path 
                                            strokeLinecap="round" 
                                            strokeLinejoin="round" 
                                            d="M9 5l7 7-7 7" 
                                        />
                                    </svg>
                                </Link>
                            </article>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    )
} 
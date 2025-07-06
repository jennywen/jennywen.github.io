import Link from 'next/link'
import Image from 'next/image'
import PageLayout from '@/components/PageLayout';
import { getSortedPostsData } from './lib/api'
import { formatDate } from './lib/utils'

export default function BlogPage() {
  const posts = getSortedPostsData()
  
  return (
    <PageLayout>
        <h1 className="text-4xl font-serif mb-12 mt-4 tracking-tight">
          <Link href="/" className="font-bold font-serif text-black hover:text-gray-800 hover:no-underline no-underline dark:text-white dark:hover:text-gray-300">
            Jenny Wen
            <span className='font-serif font-semibold'> — Notes</span>
          </Link>
          
        </h1>
          {posts.map((post) => (
            <div key={post.id} className="mb-8 xl:mr-60 lg:mr-30 md:mr-10 max-w-prose bg-white text-black dark:bg-black dark:text-white">
              <div className="md:flex gap-6">
                {post.image && (
                  <div className="md:w-1/3 mb-4 md:mb-0">
                    <Image
                      src={post.image}
                      alt={`Cover image for ${post.title}`}
                      width={400}
                      height={300}
                      className="rounded-lg object-cover w-full h-[200px] dark:bg-gray-800"
                    />
                  </div>
                )}
                <div className={post.image ? 'md:w-2/3' : 'w-full'}>
                <div className="text-gray-500 mb-3 dark:text-gray-400">{formatDate(post.date)}</div>
                  <Link 
                    href={`/notes/${post.id}`}
                    className="font-medium text-black hover:underline block mb-2 dark:text-white dark:hover:text-gray-300"
                  >
                    {post.title}
                  </Link>
                  <p className="text-black mb-4 line-clamp-4 mt-0 dark:text-gray-200">
                    {post.description || 'Read more'}
                  </p>
                </div>
              </div>
            </div>
          ))}
    </PageLayout>
  )
}
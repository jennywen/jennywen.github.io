import React from 'react';
import Parser from 'rss-parser';
import Link from 'next/link';
import PageLayout from '@/components/PageLayout';
import { getSortedPostsData } from '../notes/lib/api';
import type { Metadata } from 'next';

interface SubstackPost {
  type: 'substack';
  title: string;
  link: string;
  pubDate: string;
  contentSnippet: string;
  slug: string;
  heroImage?: string | null;
}

interface NotesPost {
  type: 'notes';
  id: string;
  title: string;
  date: string;
  preview: string;
  description: string;
  image?: string;
}

function extractFirstImage(html: string): string | null {
  const match = html.match(/<img[^>]+src=["']([^"'>]+)["']/i);
  return match ? match[1] : null;
}

async function getSubstackPosts(): Promise<SubstackPost[]> {
  const parser = new Parser();
  const feed = await parser.parseURL('https://jennywen.substack.com/feed');
  return feed.items.map(item => {
    const content = item['content:encoded'] || item.content || '';
    return {
      type: 'substack',
      title: item.title || '',
      link: item.link || '',
      pubDate: item.pubDate || '',
      contentSnippet: item.contentSnippet || '',
      slug: item.link?.split('/').filter(Boolean).pop() || '',
      heroImage: extractFirstImage(content),
    };
  });
}

function normalizeNotesPosts(notes: any[]): NotesPost[] {
  return notes.map(post => ({
    type: 'notes',
    id: post.id,
    title: post.title,
    date: post.date,
    preview: post.preview,
    description: post.description,
    image: post.image,
  }));
}

function parseDate(date: string) {
  return new Date(date);
}

export const metadata: Metadata = {
  title: 'Jenny Wen — Notes',
  description: 'Notes and blog posts by Jenny Wen',
};

export default async function NotesFeedPage() {
  const [substackPosts, notesPostsRaw] = await Promise.all([
    getSubstackPosts(),
    getSortedPostsData(),
  ]);
  const notesPosts = normalizeNotesPosts(notesPostsRaw);

  const allPosts = [
    ...substackPosts.map(post => ({
      ...post,
      date: post.pubDate,
    })),
    ...notesPosts,
  ].sort((a, b) => parseDate(b.date).getTime() - parseDate(a.date).getTime());

  return (
    <PageLayout>
      <h1 className="text-4xl font-serif mb-12 mt-4 tracking-tight">
        <Link href="/" className="font-bold font-serif text-black hover:text-gray-800 hover:no-underline no-underline dark:text-white dark:hover:text-gray-300">
          Jenny Wen
          <span className='font-serif font-semibold'> — Notes</span>
        </Link>
      </h1>
      {allPosts.map((post, idx) => (
        post.type === 'substack' ? (
          <div key={post.slug} className="mb-16 xl:mr-60 lg:mr-30 md:mr-10 max-w-prose bg-white text-black dark:bg-black dark:text-white">
            <Link href={`/notes/${post.slug}`} className="block group post-link">
              <div className="w-full">
                <div className="w-full">
                  <div className="text-gray-500 mb-3 dark:text-gray-400">
                    {new Date(post.pubDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </div>
                  <div className="font-medium text-black block mb-2 dark:text-white dark:hover:text-gray-300">
                    <span className="post-title">{post.title}</span>
                  </div>
                  <p className="text-black mb-4 line-clamp-4 mt-0 dark:text-gray-200">
                    {post.contentSnippet}
                  </p>
                </div>
              </div>
            </Link>
          </div>
        ) : (
          <div key={post.id} className="mb-8 xl:mr-60 lg:mr-30 md:mr-10 max-w-prose bg-white text-black dark:bg-black dark:text-white">
            <Link href={`/notes/${post.id}`} className="block group post-link">
              <div className="w-full">
                <div className="w-full">
                  <div className="text-gray-500 mb-3 dark:text-gray-400">
                    {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </div>
                  <div className="font-medium text-black block mb-2 dark:text-white dark:hover:text-gray-300">
                    <span className="post-title">{post.title}</span>
                  </div>
                  <p className="text-black mb-4 line-clamp-4 mt-0 dark:text-gray-200">
                    {post.description}
                  </p>
                </div>
              </div>
            </Link>
          </div>
        )
      ))}
    </PageLayout>
  );
}
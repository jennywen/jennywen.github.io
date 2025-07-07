import Link from 'next/link';
import dynamic from 'next/dynamic';

const ScrollToTop = dynamic(
  () => import('@/components/ScrollToTop'),
  { ssr: false }
);

const socials = [
    {
        "name": "Work",
        "link": "/",
    },
    {
        "name": "Notes",
        "link": "/notes",
    },
    {
        "name": "Instagram",
        "link": "http://instagram.com/jennnywen",
    },
    {
        "name": "Twitter",
        "link": "http://twitter.com/jenny_wen"
    },
    {
        "name": "LinkedIn",
        "link": "https://www.linkedin.com/in/jennywen/",
    },
    {
        "name": "Substack",
        "link": "https://jennywen.substack.com/"
    },
    {
      "name": "Bluesky",
      "link": "https://bsky.app/profile/jennywen.ca",
  },
];

export default function PageLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="tracking-tight md:px-2 md:py-1 px-0 py-1 bg-white text-black dark:bg-black dark:text-white min-h-screen flex flex-col">
      {/* Mobile top nav */}
      <div className="md:hidden flex flex-row justify-between items-center px-7 pt-4 pb-2 mb-6">
        <div className="flex flex-row gap-6">
          <Link href="/" className="text-lg no-underline hover:underline dark:text-white dark:hover:text-gray-300">Work</Link>
          <Link href="/notes" className="text-lg no-underline hover:underline dark:text-white dark:hover:text-gray-300">Notes</Link>
        </div>
      </div>
      {/* Name for mobile */}
      <div className="bg-white text-lg dark:bg-black dark:text-white flex-1 w-full">
        <div className="grid grid-cols-12 px-7">
          <div className="col-span-11 lg:col-span-7 md:col-span-9 max-w-screen-lg pb-5 leading-relaxed">
            {children}
          </div>

          {/* Sidebar for desktop */}
          <div className="hidden md:block md:fixed md:right-8 md:top-2 lg:col-span-2 lg:col-start-11 md:col-span-2 md:col-start-12 col-span-12 pt-4 pb-20 transition-opacity">
            <div className="text-right md:mt-0 mt-6">
              {socials.map((social, index) => (
                <Link
                  key={index}
                  href={social.link}
                  className={social.link.includes('/notes')
                    ? "block no-underline hover:underline mb-10 dark:text-white dark:hover:text-gray-300"
                    : "block mb-2 no-underline hover:underline dark:text-white dark:hover:text-gray-300"}
                  target={social.link.includes('http') ? "_blank" : undefined}
                  rel="noopener noreferrer"
                >
                  {social.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Mobile bottom social nav */}
      <nav className="md:hidden flex flex-row px-7 py-2 pb-10 w-full">
        {socials.slice(2).map((social, idx, arr) => (
          <>
            <Link
              key={social.name}
              href={social.link}
              className="text-left no-underline text-lg dark:text-white inline-block transition"
              target={social.link.startsWith('http') ? "_blank" : undefined}
              rel="noopener noreferrer"
            >
              {social.name}
            </Link>
            {idx < arr.length - 1 && <span className="mx-1 text-lg text-gray-400 dark:text-gray-500">/</span>}
          </>
        ))}
      </nav>
      <ScrollToTop />
    </main>
  );
} 
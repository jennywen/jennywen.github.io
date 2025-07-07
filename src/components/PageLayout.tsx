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
    <main className="tracking-tight md:px-2 md:py-1 px-0 py-1 bg-white text-black dark:bg-black dark:text-white">
      <div className="bg-white text-lg dark:bg-black dark:text-white">
        <div className="grid grid-cols-12 px-7">
          <div className="col-span-11 lg:col-span-7 md:col-span-9 max-w-screen-lg pb-5 leading-relaxed">
            {children}
          </div>

          {/* Socials Section */}
          <div className="md:fixed md:right-8 md:top-2 lg:col-span-2 lg:col-start-11 md:col-span-2 md:col-start-12 col-span-12 pt-4 pb-20 transition-opacity">
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

      <ScrollToTop />
    </main>
  );
} 
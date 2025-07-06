import Image from 'next/image';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import PageLayout from '@/components/PageLayout';
import clsx from "clsx";


// Data arrays
const projects = [
    {
        "date": "November 2024",
        "name": "Navigating a design career",
        "desc": "The Figma at Waterloo crew had me over to chat about career stuff. I came with a few lessons I learned from my career, and I left with hope and optimism about the design community in Waterloo.",
        "link": "https://www.youtube.com/watch?v=xE5V63EFkvA",
        "img": ["waterloo.png", "waterloo-2.png"],
    },{
        "date": "June 2024",
        "name": "Figma Slides",
        "desc": "I had the honor of supporting <a href='https://keeyen.com/' target='_blank'>Keeyen Yeo</a>, Khalil Cader, and Jakub Swiadek through the year in which they launched Figma's third product.",
        "link": "https://figma.com/slides",
        "img": ["slides.png"],
    },{
        "date": "June 2024",
        "name": "Why we build what we build",
        "desc": "A short panel for the Leadership Collective at Config 2024 around the things we build at Figma. In collab with Katie Szeto, Marcel Weekes, and Sho Kuwamato",
        "link": "https://www.youtube.com/watch?v=nE98SGvGkIw",
        "img": ["why-we-build-1.png", "why-we-build-2.png"],
    },{
        "date": "March 2024",
        "name": "Dive Club",
        "desc": "Got to chat with Ridd about designing for delight and how we made FigJam.",
        "link": "https://www.dive.club/deep-dives/jenny-wen",
        "img": ["dive-club.png"],
    },{
        "date": "November 2023",
        "name": "FigJam AI",
        "desc": "We launched a bundle of AI features — summarization, clustering, board generation, and Jambot. I'm very proud to have supported the team that made this happen: <a href='https://www.tash.work/' target='_blank'>Natasha Tenggoro</a>, <a href='https://rocky.framer.website/' target='_blank'>Rocky Chen</a>, <a href='https://aoshengran.com/' target='_blank'>Aosheng Ran</a>, <a href='http://read.cv/matt' target='_blank'>Matt Chan</a>, and many other cross-functional folks.",
        "img": ["figjam-ai.png"],
        "link": "https://www.fastcompany.com/90978774/figmas-new-ai-powered-tools-will-make-your-meetings-suck-less"
    },
    {
        "date": "June 2023",
        "name": "Putting joy on the roadmap",
        "desc": "A battle cry to make software less boring and more joyful. I did this talk twice—at CanUX in October 2022, and at Config in June 2023 with Mihika Kapoor and <a href='https://keeyen.com/' target='_blank'>Keeyen Yeo</a>. And I also got to host Config again— this time on the big stage, in front of 8,000 people.",
        "img": ["putting-joy-1.png", "putting-joy-2.png"],
        "link": "https://www.youtube.com/watch?v=nqHIDavoeiU",
    },{
        "date": "May 2023",
        "name": "First Round Angel Track",
        "desc": "I had the privilege of joining First Round's Spring 2023 cohort to kick off my investing journey. Investing always felt like a black box process, with lots going on behind closed doors. But Angel Track peeled back the curtain and made me a more intentional investor.",
        "img": ["angeltrack.png"],
        "link": "https://angeltrack.firstround.com/",
    },{
        "date": "April 2023",
        "name": "Building a product people love",
        "desc": "A Q&A I did with Designer Fund. I got to talk shop about FigJam, raising the craft bar, designing with business objectives in mind, and running workshops.",
        "img": ["designer-fund.png"],
        "link": "https://www.designerfund.com/blog/jenny-wen-figma-interview/",

    },{ 
        "date": "December 2022",
        "name": "Design hiring fireside chat",
        "desc": "For Figma's Early Career Week, I got to be on a panel with some stellar industry leaders. We chatted about how to stand out and get hired as an early career designer.",
        "img": ["hiring-fireside.png"],
        "link": "https://www.youtube.com/watch?v=BJMwY7xlevs&ab_channel=Figma",
    },{
        "date": "August 2022",
        "name": "FigJam onboarding",
        "desc": "An experiment we ran that had new users pick between four simple templates. Such a fun one to jam with <a href='https://www.andrewschmidt.net/ target='_blank'>Andrew Schmidt</a> on.",
        "img": ["onboarding-1.png", "onboarding-2.png"],
    },{
        "date": "February 2022",
        "name": "Quality of life updates",
        "desc": "Our first quality-of-life drop of the year! I worked on adding resizing to sticky notes, custom colors, and a wider set of font sizes. Still keeping a simple, opinionated set of defaults, but also allowing more powerful customization for those who need it.",
        "img": ["quality-1.png", "quality-2.png"],
        "link": "https://twitter.com/figma/status/1512112577915936800",
    },{
        "date": "November 2021",
        "name": "This or that widget",
        "desc": "For the launch of widgets in FigJam, I fiddled around with the new widget API and made a little poll with just two choices. Perfect for this or that, yes or no, would you rather, and other divisive questions.",
        "img": ["this-or-that.png"],
        "link": "https://www.figma.com/community/widget/1039076335849437116",
    },{
        "date": "November 2021",
        "name": "Word magnets",
        "desc": "Turn any text in your FigJam or design file into a set of fridge magnets. Great for writers' block or a team poetry writing jam.",
        "img": ["magnets.png"],
        "link": "https://www.figma.com/community/plugin/1039409208297926871/Word-magnet-generator",
    },{
        "date": "November 2021",
        "name": "FigJam templates",
        "desc": "No need to start from scratch anymore. I designed the end-to-end experience of templates — bringing our Community's best templates directly into the product.",
        "img": ["templates.png"]
    },{
        "date": "May 2021",
        "name": "Layout: Designing FigJam",
        "desc": "Keeyen and I got to share a bit about the behind the scenes of FigJam with Kevin and Rafa.",
        "img": ["layoutfm.png"],
        "link": "https://podcasts.apple.com/gh/podcast/204-designing-figjam-with-jenny-wen-and-kee-yen-yeo/id1050276556?i=1000519455629",
    },{
        "date": "April 2021",
        "name": "Introducing FigJam",
        "desc": "I spent most of 2020 driving the direction, leading the design and executing on the details for the launch of FigJam. <p>I designed the core experience for FigJam's launch — its shapes, sticky notes, text, and all of their core interactions. I also designed cursor chat, emotes, and reactions.",
        "img": ["figjam-1.png"],
        "link": "http://figjam.new",
    },{
        "date": "April 2021",
        "name": "Short stories from the making of FigJam",
        "desc": "Config 2021 was honestly a really big moment for me! I hosted the first day of our annual user conference. I also did a talk with Emily Lin and Priya Kotak on how we made FigJam.",
        "img": ["config-2021-1.png", "config-2021-2.png"],
        "link": "https://www.youtube.com/watch?v=yC-eh1ObTDA&",
    },{
        "date": "June 2020",
        "name": "Designing your design career",
        "desc": "A talk for UW/UX (a club near and dear to my heart) on navigating early career opportunities and internships. I also shared my favourite goal setting framework, which you can try out, too.",
        "img": ["designing-career.png"],
        "link": "https://www.youtube.com/watch?v=R5opeML6iF8",
    },{    
       "date": "February 2020",
       "name": "A beautiful mess",
       "desc": "A Q&A talk I did with Lizhi Fan on the messiness of how design and engineering work together at Figma.",
       "img": ["config-2020-1.png", "config-2020-2.png"],
       "link": "https://www.youtube.com/watch?v=yC-eh1ObTDA&",
    },{
        "date": "November 2019",
        "name": "Word count",
        "desc": "In the spirit of Figma's plugins launch, I dipped my toes into our plugin API. It was surprisingly easy to use and I ended up making this popular plugin. Really proud of myself for remembering how to do recursion, without looking it up.",
        "img": ["word-count2.png"],
        "link": "https://www.figma.com/community/plugin/742152456731717201/Word-Count",
    },{
        "date": "October 2019",
        "name": "Community and collaboration",
        "desc": "My first launch at Figma! I worked closely with Rasmus Andersson on the first version of our Community, alongside a refresh of our file browser. ",
        "img": ["coco.png"],
        "link": "https://www.figma.com/blog/introducing-figma-community/",
    },{
        "date": "January 2019",
        "name": "Interface Lovers",
        "desc": "A little feature I got to to do, where I shared some of my experiences working on Dropbox Paper and revealed to everyone that I used an Android.",
        "img": ["interface-lovers.png"],
        "link": "https://www.loversmagazine.com/interviews/jenny-wen",
    }
];

const socials = [
    {
        "name": "Bluesky",
        "link": "https://bsky.app/profile/jennywen.ca",

    },{
        "name": "Instagram",
        "link": "http://instagram.com/jennnywen",
    },{
        "name": "Twitter",
        "link": "http://twitter.com/jenny_wen"
    },{
        "name": "LinkedIn",
        "link": "https://www.linkedin.com/in/jennywen/",
    },{
        "name": "Substack",
        "link": "https://jennywen.substack.com/"
    }

];

export default function Home() {
  return (
    <PageLayout>
      <div className="xl:mr-60 lg:mr-30 md:mr-20 max-w-prose">
        <h1 className="font-serif font-extrabold md:text-8xl text-7xl mt-0 mb-6 text-dark tracking-tight">Jenny Wen</h1>
        <div className="leading-relaxed">
          
          I lead design for our friend, <a href="https://claude.ai" target="_blank" rel="noopener noreferrer">Claude</a> at Anthropic. Before this, I was Director of Design at Figma, where I led the products and teams at the frontier of our business (
          <a href="http://figma.com/figjam" target="_blank" rel="noopener noreferrer">FigJam</a>, {' '}
          <a href="http://figma.com/slides" target="_blank" rel="noopener noreferrer">Slides</a>, {' '}
          <a href="http://figma.com/buzz" target="_blank" rel="noopener noreferrer">Figma Buzz</a>, {' '}
          <a href="http://figma.com/sites" target="_blank" rel="noopener noreferrer">Sites CMS</a>, {' '}
          <a href="http://figma.com/community" target="_blank" rel="noopener noreferrer">Community</a>
          , and Growth). As a designer, I brought FigJam to market, poured myself into so many little details, and grew it into a tool people love using.
        </div>
        <div className="mt-4 leading-relaxed mb-16">
          In lots of parts of my life, I'm a generalist. I'm good at helping teams be more ambitious together. To imagine novel solutions, to ship higher quality products, and most importantly—to have fun through it all.
        </div>
      </div>

      {projects.map((project, index) => (
        <article key={index} className="mb-12 my-12">
          <div className="text-gray-500">{project.date}</div>
          <div className="mb-6 mt-6 leading-relaxed xl:mr-60 lg:mr-30 max-w-prose md:mr-20">
            {project.link ? (
              <Link 
                href={project.link}
                className="text-black hover:underline dark:text-white dark:hover:text-gray-300"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="font-medium">{project.name}</span>
              </Link>
            ) : (
              <span className="font-medium">{project.name}</span>
            )}
            &nbsp;&mdash;&nbsp;
            <span dangerouslySetInnerHTML={{ __html: project.desc }} />
          </div>
          
          {project.img && (
            <div className="grid grid-cols-12 md:gap-6 gap-2">
              {project.img.map((img, imgIndex) => (
                <div 
                  key={imgIndex} 
                  className={clsx(
                    project.img.length === 2 && imgIndex === 0
                      ? "mb-0 md:mb-6"
                      : project.img.length === 2 && imgIndex === 1
                        ? "mb-6 md:mb-0"
                      : imgIndex === 0
                        ? "mb-6"
                        : "",
                    project.img.length % 2
                      ? "col-span-12"
                      : "md:col-span-6 col-span-12"
                  )}
                >
                  <Image
                    src={`/assets/${img}`}
                    alt={project.name}
                    width={800}
                    height={600}
                    className="w-full rounded-none mb-0"
                  />
                </div>
              ))}
            </div>
          )}
        </article>
      ))}
    </PageLayout>
  );
}


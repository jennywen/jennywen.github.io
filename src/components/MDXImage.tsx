import Image from 'next/image'

export default function MDXImage({ src, alt, ...props }: { 
  src: string; 
  alt: string;
  [key: string]: any;
}) {
  console.log('MDXImage props:', { src, alt, ...props });
  
  // If the parent is a flex container, adjust the image size
  const parentIsFlexbox = props.parentClassName?.includes('flex');
  
  return (
    <div className={parentIsFlexbox ? 'flex-1' : 'w-full'}>
      <Image
        src={src}
        alt={alt}
        width={800}
        height={400}
        className="rounded-lg my-4 w-full"
      />
    </div>
  )
} 

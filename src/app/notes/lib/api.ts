import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { remark } from "remark"
import html from "remark-html"

const postsDirectory = path.join(process.cwd(), "src/app/notes/posts")

export function getSortedPostsData() {
  // Check if the posts directory exists
  if (!fs.existsSync(postsDirectory)) {
    console.warn("Posts directory does not exist. Creating it now.")
    fs.mkdirSync(postsDirectory)
    return [] // Return an empty array if there are no posts
  }

  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory)
  const allPostsData = fileNames.map((fileName) => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, "")

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, "utf8")

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents)
    

    // Generate preview from content
    let preview = 'Click to read more...'
    if (matterResult.data.excerpt) {
      preview = matterResult.data.excerpt
    } else if (matterResult.content) {
      // Remove any markdown symbols and extra whitespace
      const cleanContent = matterResult.content
        .replace(/[#*`_\[\]]/g, '')  // Remove markdown symbols
        .replace(/\n+/g, ' ')        // Replace newlines with spaces
        .trim()
      
      // Take first 200 characters
      preview = cleanContent.length > 200 
        ? cleanContent.substring(0, 200).trim() + '...'
        : cleanContent
    }

    // Return the combined data
    return {
      id,
      title: matterResult.data.title || 'Untitled',
      date: matterResult.data.date || 'No date',
      preview,
      description: matterResult.data.description || '',
      image: matterResult.data.image,
      content: matterResult.content
    }
  })
  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1
    } else {
      return -1
    }
  })
}

export async function getPostData(id: string) {
  const fullPath = path.join(postsDirectory, `${id}.md`)

  // Check if the file exists
  if (!fs.existsSync(fullPath)) {
    throw new Error(`Post not found: ${id}`)
  }

  const fileContents = fs.readFileSync(fullPath, "utf8")

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents)

  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content)
  const contentHtml = processedContent.toString()

  // Combine the data with the id and contentHtml
  return {
    id,
    contentHtml,
    ...(matterResult.data as { date: string; title: string; preview?: string; image?: string })
  }
}

export function getNextPost(currentId: string) {
  const posts = getSortedPostsData()
  const currentIndex = posts.findIndex(post => post.id === currentId)
  
  // If there's a next post (not the last one), return it
  if (currentIndex >= 0 && currentIndex < posts.length - 1) {
    const nextPost = posts[currentIndex + 1]
    return {
      id: nextPost.id,
      title: nextPost.title,
      description: nextPost.description // Use description instead of preview
    }
  }
  return null
}

// Helper function to get preview from content if not provided in frontmatter
function getPreviewFromContent(content: string, length: number = 150): string {
  // Remove markdown formatting and get first few characters
  const stripped = content
    .replace(/[#*`_~\[\]]/g, '') // Remove markdown symbols
    .replace(/\n+/g, ' ')        // Replace newlines with spaces
    .trim()
  return stripped.length > length 
    ? `${stripped.substring(0, length)}...`
    : stripped
}


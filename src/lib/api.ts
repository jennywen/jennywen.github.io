interface Post {
    id: string;  // This will be used as the slug
    title: string;
    date: string;
    description: string;
    content?: string;
}

const posts: Post[] = [
    {
        id: 'hello-world',
        title: 'Hello World',
        date: 'March 2024',
        description: 'My first blog post',
        content: "Welcome to my blog! This is where I'll share my thoughts on design, technology, and life."
    }
    // Add more posts here
];

export function getSortedPostsData(): Post[] {
    // Sort posts by date
    return posts.sort((a, b) => {
        if (a.date < b.date) {
            return 1;
        } else {
            return -1;
        }
    });
}

export function getPostData(slug: string): Post | undefined {
    return posts.find(post => post.id === slug);
} 
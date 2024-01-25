import { Post, Tag } from '@/app/blog/page'

interface NewPost extends Post {
  tags: Tag[]
  ID: string
}

const extractTagsFromPosts = <T extends { posts: Post[] }>(
  data: T
): T & { posts: NewPost[] } => {
  const newData = data
  const posts: Post[] | NewPost[] = data.posts as Post[] | NewPost[]
  const tags: Tag[][] = posts.map((post) => Object.values(post.tags))
  posts.forEach((post, idx: number) => {
    post.tags = tags[idx]
  })
  newData.posts = posts as NewPost[]
  return newData
}

const extractTagsFromPost = (data: Post) => {
  const newData = data
  const tags: Tag[] = Object.values(data.tags)
  newData.tags = tags
  return newData
}

export { extractTagsFromPost, extractTagsFromPosts }

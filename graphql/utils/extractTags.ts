import { Tag } from "../schemas/tag"

interface Post {
  tags: Record<string, Tag>
}

interface NewPost {
  tags: Tag[]
}

const extractTagsFromPosts = (data: { posts: Post[] }): { posts: NewPost[] } => {
  const newData: any = data
  const posts: Post[] | NewPost[] = data.posts as Post[] | NewPost[]
  const tags: Tag[][] = posts.map((post) => Object.values(post.tags))
  posts.forEach((post, idx: number) => {
    post.tags = tags[idx]
  })
  newData.posts = posts as NewPost[]
  return newData
}

const extractTagsFromPost = (data: Post) => {
  const newData: any = data
  const tags: Tag[] = Object.values(data.tags)
  newData.tags = tags
  return newData
}

export { extractTagsFromPost, extractTagsFromPosts }

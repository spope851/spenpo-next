const extractTagsFromPosts = (data: any) => {
  const newData = data
  const posts = data.posts
  const tags = posts.map((post: any) => Object.values(post.tags))
  posts.forEach((post: any, idx: number) => {
    post.tags = tags[idx]
  })
  newData.posts = posts
  return newData
}

const extractTagsFromPost = (data: any) => {
  const newData = data
  const tags = Object.values(data.tags)
  newData.tags = tags
  return newData
}

export { extractTagsFromPost, extractTagsFromPosts }

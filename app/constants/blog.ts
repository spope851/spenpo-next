const previewImages: Record<string, string> = {
  159: 'https://www.wiseradvisor.com/blog/wp-content/uploads/2019/08/Building-Wealth-660x400.jpg',
  156: 'https://media.licdn.com/dms/image/C4E12AQGHInBIy9bh2g/article-cover_image-shrink_600_2000/0/1544044221946?e=2147483647&v=beta&t=W9n_d_DOSj5LtKLUquoC9_VEB_4lMZhFW-FHvH_ONiw',
  152: 'https://images.unsplash.com/photo-1525545575852-94dac00e6836?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=2000&fit=max&ixid=eyJhcHBfaWQiOjExNzczfQ',
}

const WP_ROOT = process.env.WP_ROOT

const WP_REST_URI = `${WP_ROOT}/wp-json/wp/v2`

const WP_CHILD_THEME_RESOURCES = `${WP_ROOT}/wp-content/themes/twentytwentyfour-spenpo`

export { previewImages, WP_ROOT, WP_REST_URI, WP_CHILD_THEME_RESOURCES }

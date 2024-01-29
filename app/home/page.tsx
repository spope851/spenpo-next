import React from 'react'
import { Stack } from '@mui/material'
import { LinkPreview } from '../components/linkPreview'
import prisma from '../utils/prisma'
import { PROJECTS } from '../constants/projects'
import { previewImages } from '../constants/blog'
import { ContactForm } from '../contact/components/contactForm'

const LIMIT = 3

const LINK_PREV_PROPS = {
  backgroundColor: '#555',
  primaryTextColor: '#fff',
  secondaryTextColor: '#fff',
  borderRadius: 4,
}

export default async function Home() {
  const products = await prisma.product.findMany({
    where: {
      hide: false,
    },
  })

  return (
    <Stack p={{ sm: 5, xs: 2 }} gap={3} bgcolor="#555">
      <Stack direction="row" gap={3}>
        {products.map(({ id }) => (
          <LinkPreview
            key={id}
            {...LINK_PREV_PROPS}
            url={`https://spenpo.com/products/${id}`}
          />
        ))}
        <ContactForm />
      </Stack>
      <Stack direction="row" gap={3}>
        {PROJECTS.slice(0, LIMIT).map((id) => (
          <LinkPreview
            key={id}
            {...LINK_PREV_PROPS}
            borderRadius={4}
            url={`https://spenpo-next-git-feature-home-redesign-spope851.vercel.app/projects/${id}`}
          />
        ))}
      </Stack>
      <Stack direction="row" gap={3}>
        {Object.keys(previewImages)
          .slice(0, LIMIT)
          .map((id) => (
            <LinkPreview
              key={id}
              {...LINK_PREV_PROPS}
              borderRadius={4}
              url={`https://spenpo-next-git-feature-home-redesign-spope851.vercel.app/blog/${id}`}
            />
          ))}
      </Stack>
    </Stack>
  )
}

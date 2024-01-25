type MetadataProps = {
  params: { id: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

interface PageProps {
  params: { [key: string]: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export type { MetadataProps, PageProps }

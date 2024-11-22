export interface ResumeSection {
  title: string
  defaultExpanded?: boolean
  content: {
    type: 'text' | 'list' | 'nested'
    items?: Array<{
      text: string
      year?: string
      link?: string
      yearLink?: string
      indent?: number
    }>
    textContent?: Array<{
      label?: string
      text: string
    }>
    nestedSections?: Array<{
      title: string
      linkTitle: string
      href: string
      subTitle: string
      details: Array<{
        text?: string
        title?: string
        subTitle?: string
        indent?: number
      }>
    }>
  }
}

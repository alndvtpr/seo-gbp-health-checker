export interface BlogImage {
  src: string
  alt: string
  caption?: string
  attribution?: string
}

export interface BlogSource {
  label: string
  url: string
}

export interface BlogSection {
  heading: string
  body: string[]
  codeBlock?: {
    code: string
    language: string
    filename?: string
  }
  highlight?: {
    title: string
    text: string
  }
  takeaways?: string[]
  image?: BlogImage
  sources?: BlogSource[]
}

export interface BlogPost {
  slug: string
  title: string
  category: string
  date: string
  datePublished: string
  dateModified?: string
  readTime: string
  excerpt: string
  heroImage?: BlogImage
  content: {
    lead: string
    sections: BlogSection[]
  }
}

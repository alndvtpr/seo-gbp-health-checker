export interface SkillCategory {
  title: string
  icon: string
  skills: string[]
}

export interface ExperienceItem {
  role: string
  company: string
  type: string
  period: string
  location?: string
  highlights: string[]
}

export interface ProjectFeature {
  title: string
  tagline: string
  proofLabel: string
  status?: string
  description: string
  link: string
  isExternal?: boolean
  tags: string[]
}

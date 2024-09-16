import { Projects } from '@/app/types/routing'

const PROJECTS: Projects[] = [
  'file-feed',
  'starter-kit-next',
  'cracker',
  'spenpo-landing',
  'two-truths',
  'language-flash',
  '3x3-cube',
  'react-timeclock',
]

const METADATA: Record<Projects, { image: string; description: string }> = {
  'file-feed': {
    description: 'public file sharing feed',
    image: '/images/file-feed.png',
  },
  'starter-kit-next': {
    description:
      "a framework implementation of Ryan from Oak Harbor Web Design's fabulous Starter-Kit-V2 static site template",
    image: '/images/starter-kit-next.png',
  },
  cracker: {
    description: 'a full-stack creativity tracker app',
    image: '/images/cracker.png',
  },
  'spenpo-landing': {
    description: 'customizable landing page product',
    image: '/images/landing-page.png',
  },
  '3x3-cube': { description: 'solve a 3x3 puzzle cube', image: '' },
  'language-flash': {
    description: 'flashcards for studying a new language',
    image: '',
  },
  'react-timeclock': {
    description: 'timeclock component for tracking work done on a website',
    image: '',
  },
  'two-truths': { description: 'two truths and a lie app', image: '' },
}

const DEFAULT_PROJECT: Projects = 'spenpo-landing'
export { DEFAULT_PROJECT, PROJECTS, METADATA }

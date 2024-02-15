import { Projects } from '@/app/types/routing'
import { CrackerDemo } from '../components/demos/CrackerDemo'
import { CubeDemo } from '../components/demos/CubeSolverDemo'
import { LanguageFlashDemo } from '../components/demos/LanguageFlashDemo'
import { ReactTimeclockDemo } from '../components/demos/ReactTimeclockDemo'
import { SpenpoLandingDemo } from '../components/demos/SpenpoLandingDemo'
import { StarterKitNextDemo } from '../components/demos/StarterKitNextDemo'
import { TwoTruthsDemo } from '../components/demos/TwoTruthsDemo'
import { CrackerDes } from '../components/descriptions/CrackerDes'
import { CubeDes } from '../components/descriptions/CubeSolverDes'
import { LanguageFlashDes } from '../components/descriptions/LanguageFlashDes'
import { ReactTimeclockDes } from '../components/descriptions/ReactTimeclockDes'
import { SpenpoLandingDes } from '../components/descriptions/SpenpoLandingDes'
import { StarterKitNextDes } from '../components/descriptions/StarterKitNextDes'
import { TwoTruthsDes } from '../components/descriptions/TwoTruthsDes'

export const projects: Record<
  Projects,
  Record<'description' | 'demo', JSX.Element>
> = {
  'starter-kit-next': {
    description: <StarterKitNextDes />,
    demo: <StarterKitNextDemo />,
  },
  cracker: {
    description: <CrackerDes />,
    demo: <CrackerDemo />,
  },
  'spenpo-landing': {
    description: <SpenpoLandingDes />,
    demo: <SpenpoLandingDemo />,
  },
  'two-truths': {
    description: <TwoTruthsDes />,
    demo: <TwoTruthsDemo />,
  },
  'language-flash': {
    description: <LanguageFlashDes />,
    demo: <LanguageFlashDemo />,
  },
  '3x3-cube': {
    description: <CubeDes />,
    demo: <CubeDemo />,
  },
  'react-timeclock': {
    description: <ReactTimeclockDes />,
    demo: <ReactTimeclockDemo />,
  },
}

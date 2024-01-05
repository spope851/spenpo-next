import { Projects } from '@/types'
import CubeDemo from './demos/cubeSolverDemo'
import LanguageFlashDemo from './demos/languageFlashDemo'
import ReactTimeclockDemo from './demos/reactTimeclockDemo'
import TwoTruthsDemo from './demos/twoTruthsDemo'
import CubeDes from './descriptions/cubeSolverDes'
import LanguageFlashDes from './descriptions/languageFlashDes'
import ReactTimeclockDes from './descriptions/reactTimeclockDes'
import TwoTruthsDes from './descriptions/twoTruthsDes'
import SpenpoLandingDes from './descriptions/spenpoLandingDes'
import SpenpoLandingDemo from './demos/spenpoLandingDemo'
import StarterKitNextDemo from './demos/starterKitNextDemo'
import StarterKitNextDes from './descriptions/starterKitNextDes'

export * from './styled'

const projects: Record<Projects, Record<'description' | 'demo', JSX.Element>> = {
  'starter-kit-next': {
    description: <StarterKitNextDes />,
    demo: <StarterKitNextDemo />,
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

export default projects

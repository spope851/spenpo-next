import { Projects } from '@/app/types/routing'
import { CrackerDemo } from './demos/CrackerDemo'
import { CubeDemo } from './demos/CubeSolverDemo'
import { LanguageFlashDemo } from './demos/LanguageFlashDemo'
import { ReactTimeclockDemo } from './demos/ReactTimeclockDemo'
import { SpenpoLandingDemo } from './demos/SpenpoLandingDemo'
import { StarterKitNextDemo } from './demos/StarterKitNextDemo'
import { TwoTruthsDemo } from './demos/TwoTruthsDemo'
import { CrackerDes } from './descriptions/CrackerDes'
import { CubeDes } from './descriptions/CubeSolverDes'
import { LanguageFlashDes } from './descriptions/LanguageFlashDes'
import { ReactTimeclockDes } from './descriptions/ReactTimeclockDes'
import { SpenpoLandingDes } from './descriptions/SpenpoLandingDes'
import { StarterKitNextDes } from './descriptions/StarterKitNextDes'
import { TwoTruthsDes } from './descriptions/TwoTruthsDes'
import { FileFeedDemo } from './demos/FileFeedDemo'
import { FileFeedDes } from './descriptions/FileFeedDes'

export const projects: Record<
  Projects,
  Record<'description' | 'demo', JSX.Element>
> = {
  'file-feed': {
    description: <FileFeedDes />,
    demo: <FileFeedDemo />,
  },
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

import { CrackerDemo } from './demos/CrackerDemo'
import { CubeDemo } from './demos/CubeSolverDemo'
import { LanguageFlashDemo } from './demos/LanguageFlashDemo'
import { ReactTimeclockDemo } from './demos/ReactTimeclockDemo'
import { SpenpoLandingDemo } from './demos/SpenpoLandingDemo'
import { StarterKitNextDemo } from './demos/StarterKitNextDemo'
import { TwoTruthsDemo } from './demos/TwoTruthsDemo'
import { FileFeedDemo } from './demos/FileFeedDemo'

export const projects: Record<string, JSX.Element> = {
  'file-feed': <FileFeedDemo />,
  'starter-kit-next': <StarterKitNextDemo />,
  cracker: <CrackerDemo />,
  'spenpo-landing': <SpenpoLandingDemo />,
  'two-truths': <TwoTruthsDemo />,
  'language-flash': <LanguageFlashDemo />,
  '3x3-cube': <CubeDemo />,
  'react-timeclock': <ReactTimeclockDemo />,
}

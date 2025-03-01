import { CrackerDemo } from './demos/CrackerDemo'
import { CubeDemo } from './demos/CubeSolverDemo'
import { LanguageFlashDemo } from './demos/LanguageFlashDemo'
import { ReactTimeclockDemo } from './demos/ReactTimeclockDemo'
import { SpenpoLandingDemo } from './demos/SpenpoLandingDemo'
import { StarterKitNextDemo } from './demos/StarterKitNextDemo'
import { TwoTruthsDemo } from './demos/TwoTruthsDemo'
import { FileFeedDemo } from './demos/FileFeedDemo'
import { TigerGradesDemo } from './demos/TigerGradesDemo'
import { WpEnvBackupSyncDemo } from './demos/WpEnvBackupSyncDemo'
import { SpenpoResumeDemo } from './demos/SpenpoResumeDemo'

export const projects: Record<string, JSX.Element> = {
  'tiger-grades': <TigerGradesDemo />,
  'spenpo-resume': <SpenpoResumeDemo />,
  'wp-env-backup-sync': <WpEnvBackupSyncDemo />,
  'file-feed': <FileFeedDemo />,
  'starter-kit-next': <StarterKitNextDemo />,
  cracker: <CrackerDemo />,
  'spenpo-landing': <SpenpoLandingDemo />,
  'two-truths': <TwoTruthsDemo />,
  'language-flash': <LanguageFlashDemo />,
  '3x3-cube': <CubeDemo />,
  'react-timeclock': <ReactTimeclockDemo />,
}

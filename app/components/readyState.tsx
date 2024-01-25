import CircleIcon from '@mui/icons-material/Circle'
import { READY_STATE_COLORS } from '@/app/constants/vercel'
import { VercelReadyState } from '@/app/products/landing-page/[appName]/deployments/components/useDeployment'

export const ReadyState: React.FC<{ readyState: VercelReadyState }> = ({
  readyState,
}) => <CircleIcon sx={{ fill: READY_STATE_COLORS[readyState], height: 12 }} />

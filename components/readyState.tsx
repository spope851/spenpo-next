import CircleIcon from "@mui/icons-material/Circle"
import { VercelReadyState } from "./deployment/useDeployment"
import { READY_STATE_COLORS } from "@/constants/vercel"

export const ReadyState: React.FC<{ readyState: VercelReadyState }> = ({
  readyState,
}) => <CircleIcon sx={{ fill: READY_STATE_COLORS[readyState], height: 12 }} />

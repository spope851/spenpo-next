import Redis from "ioredis"
import * as keys from "./keys"

const redis = new Redis(`redis://${keys.serverHost}:${keys.redisPort}`)

export default redis

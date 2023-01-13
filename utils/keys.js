import { __prod__ } from "./env"

export const pgUser = process.env.POSTGRES_USER
export const pgPassword = process.env.POSTGRES_PASSWORD
export const pgDatabase = process.env.POSTGRES_DB
export const pgHost = __prod__ ? "database" : "localhost"
export const pgPort = process.env.PGPORT

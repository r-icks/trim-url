import dotenv from "dotenv"
dotenv.config()

export const connection = {
    host: process.env.P_HOST,
    user: process.env.P_USER,
    password: process.env.P_PASSWORD,
    database: process.env.P_DATABASE,
    port: process.env.P_PORT,
    ssl: {
        rejectUnauthorized: false
    }
}
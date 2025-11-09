import 'dotenv/config'
import { DataSource } from "typeorm";

const dbType = process.env.DB_TYPE as 'postgres'

export const AppDataSource = new DataSource({
    type: dbType,
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || "5432"),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    synchronize: true,
    logging: true,
    entities: ['src/models/*.ts'],
    subscribers: [],
    migrations: ['src/migrations/*.ts'],
})
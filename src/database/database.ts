import "reflect-metadata";
import { Connection, ConnectionOptions, createConnection } from "typeorm";
import { User } from "./entities/User";

const dbOptions: ConnectionOptions = {
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "user",
    password: "password",
    database: "db",
    entities: [User],
    synchronize: true,
}

export class Database {
    public async connection(): Promise<Connection> {
        try {
            const conn = await createConnection(dbOptions);
            console.log("Connection established the database");
            return conn;
        } catch (error) {
            throw new Error(error);
        }
    }
}
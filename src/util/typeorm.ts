import { createConnection } from "typeorm";
import "reflect-metadata";
import { ConnectionOptions } from "typeorm";
import { User } from "../entity/User";

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

export async function connectionDb(): Promise<void> {
    try {
        await createConnection(dbOptions);
        console.log("Connected with database");
    } catch (error) {
        console.log(error);
    }
}
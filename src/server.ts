import './util/module-alias';
import { Server } from '@overnightjs/core';
import bodyParser from 'body-parser';
import { MainController } from './controllers/main';
import { UserController } from './controllers/user';
import { Application } from 'express';
import * as http from 'http';

export class SetupServer extends Server {
    private server?: http.Server;

    constructor(private port = 3000) {
        super();
    }

    public init(): void {
        this.setupExpress();
        this.setupControllers();
    }

    private setupExpress(): void {
        this.app.use(bodyParser.json());
    }

    private setupControllers(): void {
        const mainController = new MainController();
        const userController = new UserController();
        this.addControllers([mainController, userController]);
    }

    public start(): void {
        this.server = this.app.listen(process.env.PORT || this.port, () => {
            console.log('Server listening on port: ' + this.port);
        });
    }

    public async close(): Promise<void> {
        if (this.server) {
            await new Promise((resolve, reject) => {
                this.server?.close((err) => {
                    if (err) {
                        return reject(err);
                    }
                    resolve(true);
                });
            });
        }
    }

    public getApp(): Application {
        return this.app;
    }
}
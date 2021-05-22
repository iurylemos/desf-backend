import './util/module-alias';
import { Server } from '@overnightjs/core';
import bodyParser from 'body-parser';
import cors from 'cors';
import { MainController } from './controllers/main';
import { UserController } from './controllers/user';
import { CountyController } from './controllers/county';
import { Application } from 'express';
import * as http from 'http';
import { optionsCors } from './middlewares/cors';
import { StateController } from './controllers/states';

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
        this.app.use(cors(optionsCors));
    }

    private setupControllers(): void {
        const mainController = new MainController();
        const userController = new UserController();
        const countyController = new CountyController();
        const stateController = new StateController();
        this.addControllers([mainController, userController, countyController, stateController]);
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
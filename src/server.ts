import './util/module-alias';
import { Server } from '@overnightjs/core';
import { Application } from 'express';
import bodyParser from 'body-parser';
import { ForecastController } from './controllers/forecast';

export class SetupServer extends Server {
    constructor(private port = 3000) {
        super();
    }

    public async init(): Promise<void> {
        this.setupExpress();
        this.setupControllers();
    }

    private setupExpress(): void {
        this.app.use(bodyParser.json());
        this.setupControllers();
    }

    private setupControllers(): void {
        const forecastController = new ForecastController();
        this.addControllers([forecastController]);
    }

    public getApp(): Application {
        return this.app;
    }
}

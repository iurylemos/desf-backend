import { Controller, Get } from '@overnightjs/core';
import { Request, Response } from 'express';

@Controller('')
export class MainController {

    @Get('')
    public async getAPI(req: Request, res: Response): Promise<void> {
        try {
            res.status(200).send({ "API Cagece": "1.0" });
            res.end();
        } catch (error) {
            res.status(500).send({ "Error": "Algo deu errado" })
            res.end();
        }
    }
}
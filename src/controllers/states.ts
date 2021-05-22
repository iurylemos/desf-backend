import { Controller, Get } from '@overnightjs/core';
import { StateService } from '@src/services/states';
import { Request, Response } from 'express';

@Controller('estados')
export class StateController {
    @Get('')
    public async getStates(_: Request, res: Response): Promise<void> {
        try {
            const ibgeService = new StateService();
            const municipios = await ibgeService.getEstados();

            res.status(200).send(municipios);
        } catch (error) {
            res.status(500).send({ "Error": "Algo deu errado" });
        }
    }
}
import { Controller, Get } from '@overnightjs/core';
import { IbgeService } from '@src/services/ibge';
import { Request, Response } from 'express';

@Controller('ibge')
export class MainController {

    @Get('municipios')
    public async getMunicipios(req: Request, res: Response): Promise<void> {
        try {
            const ibgeService = new IbgeService();
            const { municipio } = req.params;
            const mandatoryFields = ['municipio'];

            for (const field of mandatoryFields) {
                if (!req.params[field]) {
                    res.status(400).send({ "Error": `Faltando o campo: ${field}` })
                }
            }

            const municipios = await ibgeService.getMunicipios(municipio);

            res.status(200).send({ "municipios": municipios });
            res.end();
        } catch (error) {
            res.status(500).send({ "Error": "Algo deu errado" })
            res.end();
        }
    }
}
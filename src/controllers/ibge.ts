import { Controller, Get } from '@overnightjs/core';
import { IbgeService } from '@src/services/ibge';
import { Request, Response } from 'express';

@Controller('ibge')
export class IbgeController {

    @Get('municipios/:id')
    public async getMunicipio(req: Request, res: Response): Promise<void> {
        try {
            const ibgeService = new IbgeService();
            const { id } = req.params;
            const mandatoryFields = ['id'];

            for (const field of mandatoryFields) {
                if (!req.params[field]) {
                    res.status(400).send({ "Error": `Faltando o campo: ${field}` })
                    return;
                }
            }

            const municipios = await ibgeService.getMunicipio(id);

            res.status(200).send({ "municipio": municipios });
            res.end();
        } catch (error) {
            res.status(500).send({ "Error": "Algo deu errado" })
            res.end();
        }
    }

    @Get('municipios')
    public async getMunicipios(_: Request, res: Response): Promise<void> {
        try {
            const ibgeService = new IbgeService();
            const municipios = await ibgeService.getMunicipios();

            res.status(200).send(municipios);
            res.end();
        } catch (error) {
            res.status(500).send({ "Error": "Algo deu errado" })
            res.end();
        }
    }
}
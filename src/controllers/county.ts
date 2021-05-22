import { Controller, Get } from '@overnightjs/core';
import { CountyService } from '@src/services/county';
import { Request, Response } from 'express';

@Controller('municipios')
export class CountyController {

    @Get(':id')
    public async getMunicipio(req: Request, res: Response): Promise<void> {
        try {
            const countyService = new CountyService();
            const { id } = req.params;
            const mandatoryFields = ['id'];

            for (const field of mandatoryFields) {
                if (!req.params[field]) {
                    res.status(400).send({ "Error": `Faltando o campo: ${field}` })
                    return;
                }
            }

            const municipios = await countyService.getMunicipio(id);

            res.status(200).send({ "municipio": municipios });
        } catch (error) {
            res.status(500).send({ "Error": "Algo deu errado" })
        }
    }

    @Get('')
    public async getMunicipios(_: Request, res: Response): Promise<void> {
        try {
            const countyService = new CountyService();
            const municipios = await countyService.getMunicipios();

            res.status(200).send(municipios);
        } catch (error) {
            res.status(500).send({ "Error": "Algo deu errado" });
        }
    }

    @Get('estado/:id')
    public async getMunicipioEstado(req: Request, res: Response): Promise<void> {
        try {
            const countyService = new CountyService();
            const { id } = req.params;
            const mandatoryFields = ['id'];

            for (const field of mandatoryFields) {
                if (!req.params[field]) {
                    res.status(400).send({ "Error": `Faltando o campo: ${field}` })
                    return;
                }
            }

            const municipios = await countyService.getMunicipiosEstado(id);

            res.status(200).send(municipios);
        } catch (error) {
            res.status(500).send({ "Error": "Algo deu errado" });
        }
    }
}
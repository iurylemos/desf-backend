import { Controller, Get } from '@overnightjs/core';
import { UserService } from '@src/services/user';
import { Request, Response } from 'express';

@Controller('usuario')
export class MainController {

    @Get('')
    public async registerUser(req: Request, res: Response): Promise<void> {
        try {
            const { nome, cpf, dt_nascimento, municipio } = req.body;
            const mandatoryFields = ['nome', 'cpf', 'dt_nascimento', 'municipio'];

            for (const field of mandatoryFields) {
                if (!req.params[field]) {
                    res.status(400).send({ "Error": `Faltando o campo: ${field}` })
                }
            }

            const userService = new UserService();

            const user = await userService.createUser(nome, cpf, dt_nascimento, municipio);

            res.status(200).send({ "usuario": user });
            res.end();
        } catch (error) {
            res.status(500).send({ "Error": "Algo deu errado" })
            res.end();
        }
    }
}
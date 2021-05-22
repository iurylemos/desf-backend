import { Controller, Get, Post } from '@overnightjs/core';
import { UserService } from '@src/services/user';
import { Request, Response } from 'express';

@Controller('usuario')
export class UserController {

    @Post('registrar')
    public async registerUser(req: Request, res: Response): Promise<void> {
        try {
            const { nome, cpf, dt_nascimento, municipio } = req.body;
            const mandatoryFields = ['nome', 'cpf', 'dt_nascimento', 'municipio'];

            for (const field of mandatoryFields) {
                if (!req.body[field]) {
                    // res.status(400).json({ "Error": `Faltando o campo: ${field}` })
                }
            }

            const userService = new UserService();

            await userService.createUser(nome, cpf, dt_nascimento, municipio);

            res.status(204).send();
            res.end();
        } catch (error) {
            console.log("ERROR", error)
            res.status(500).send({ "Error": "Algo deu errado" })
            res.end();
        }
    }
}
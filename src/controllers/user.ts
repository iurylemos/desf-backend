import { Controller, Get, Post } from '@overnightjs/core';
import { UserDB } from '@src/database/models/user.db';
import { isValidCPF } from '@src/util/valid-cpf';
import { Request, Response } from 'express';

@Controller('usuario')
export class UserController {

    protected db = new UserDB();

    @Post('registrar')
    public async registerUser(req: Request, res: Response): Promise<void> {
        try {
            const { nome, cpf, dt_nascimento, municipio } = req.body;
            const mandatoryFields = ['nome', 'cpf', 'dt_nascimento', 'municipio'];

            for (const field of mandatoryFields) {
                if (!req.body[field]) {
                    res.status(400).json({ "Error": `Faltando o campo: ${field}` })
                    return;
                }
            }

            if (!isValidCPF(cpf)) {
                res.status(400).send({ "Error": "CPF INVALIDO" });
                return;
            }

            await this.db.createUser(nome, cpf, dt_nascimento, municipio);

            res.status(204).send();
            return;
        } catch (error) {
            const error_stack = error.stack ? error.stack : "";

            if (error_stack.includes('Duplicate')) {
                res.status(400).send({ "Error": "CPF DUPLICADO" })
                return;
            }

            res.status(500).send(error.stack)
            res.end();

            return;
        }
    }

    @Get('todosUsuarios')
    public async getAllUsers(_: Request, res: Response): Promise<void> {
        try {
            const users = await this.db.findUsers();

            res.status(200).send({ usuarios: users });
            res.end();
        } catch (error) {
            console.log("ERROR", error)
            res.status(500).send({ "Error": "Algo deu errado" })
            res.end();
        }
    }

    @Get(':id')
    public async getUserById(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const mandatoryFields = ['id'];

            for (const field of mandatoryFields) {
                if (!req.params[field]) {
                    res.status(400).json({ "Error": `Faltando o campo: ${field}` })
                    return;
                }
            }

            const user = await this.db.getOneById(id);
            res.status(200).send({ usuario: user });
            res.end();
        } catch (error) {
            console.log("ERROR", error)
            res.status(500).send({ "Error": "Algo deu errado" })
            res.end();
        }
    }

    @Post('updateVacinacao')
    public async updateVacinacao(req: Request, res: Response): Promise<void> {
        try {
            const { id, status_vacinacao } = req.body;
            const mandatoryFields = ['id', 'status_vacionacao'];

            for (const field of mandatoryFields) {
                if (!req.body[field]) {
                    res.status(400).json({ "Error": `Faltando o campo: ${field}` })
                    return;
                }
            }

            await this.db.updateUser(id, status_vacinacao);
            res.status(204).send();
            res.end();
        } catch (error) {
            console.log("ERROR", error)
            res.status(500).send({ "Error": "Algo deu errado" })
            res.end();
        }
    }

    @Post('login')
    public async login(req: Request, res: Response): Promise<void> {
        try {
            const { cpf, data_nascimento } = req.body;
            const mandatoryFields = ['cpf', 'data_nascimento'];

            for (const field of mandatoryFields) {
                if (!req.body[field]) {
                    res.status(400).json({ "Error": `Faltando o campo: ${field}` })
                    return;
                }
            }

            if (!isValidCPF(cpf)) {
                res.status(400).json({ "Error": `CPF Invalido` })
                return;
            }

            const user = await this.db.login(cpf, data_nascimento);
            res.status(200).send(user);
            res.end();
        } catch (error) {
            console.log("ERROR", error)
            res.status(500).send({ "Error": "Algo deu errado" })
            res.end();
        }
    }
}
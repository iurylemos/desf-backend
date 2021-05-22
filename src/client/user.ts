import axios from 'axios';
import { InternalError } from '@src/util/errors/internal-service';
import { getRepository } from 'typeorm';
import { User } from '@src/entity/User';

//Error depois que é feito a requisição e deu algum problema
export class ClientRequestError extends InternalError {
    constructor(message: string, code: number) {
        const internalMessage = 'Unexpected error when trying to communicate with database';
        super(`${internalMessage}: ${message}`, code);
    }
}

export interface UserDataBase {
    nome: string,
    cpf: string,
    data_nascimento: string,
    municipio: string,
    vacinado: boolean
}

export class UserClient {
    constructor(protected request = axios) { }

    public async createUser(nome: string, cpf: string, data_nascimento: string, municipio: string): Promise<void> {
        try {
            const userRepository = getRepository(User);
            const userDB = new User();
            userDB.nome = nome;
            userDB.cpf = cpf;
            userDB.data_nascimento = data_nascimento;
            userDB.municipio = municipio;

            await userRepository.save(userDB);
        } catch (error) {
            if (error.response && error.response.status) {
                console.log("ERROR", error);
            }

            console.log("error2?", error.response);
            throw new ClientRequestError(error.message, 500);
        }
    }

    public async updateUser(id: string, status_vacinacao: boolean): Promise<void> {
        try {
            const userRepository = getRepository(User);
            const user = await userRepository.findOneOrFail(id);
            user.vacinado = status_vacinacao;
            await userRepository.save(user);
        } catch (error) {
            if (error.response && error.response.status) {
                console.log("ERROR", error);
            }

            console.log("error2?", error.response.data);
            throw new ClientRequestError(error.message, 500);
        }
    }

    public async findAll(): Promise<User[]> {
        try {
            const userRepository = getRepository(User);
            const users = await userRepository.find();
            return users;
        } catch (error) {
            if (error.response && error.response.status) {
                console.log("ERROR", error);
            }

            console.log("error2?", error.response.data);
            throw new ClientRequestError(error.message, 500);
        }
    }

    public async getOneById(id: string): Promise<User> {
        try {
            const userRepository = getRepository(User);
            const user = await userRepository.findOneOrFail(id, {
                select: ["id", "cpf", "nome", "data_nascimento", "municipio", "createdAt"]
            });
            return user;
        } catch (error) {
            if (error.response && error.response.status) {
                console.log("ERROR", error);
            }

            console.log("error2?", error.response.data);
            throw new ClientRequestError(error.message, 500);
        }
    }

    public async login(cpf: string, data_nascimento: string): Promise<User> {
        try {
            const userRepository = getRepository(User);
            const user = await userRepository.findOne({ cpf, data_nascimento });
            if (user) {
                return user;
            } else {
                throw new ClientRequestError('Usuário inexistente!', 400);
            }

        } catch (error) {
            if (error.response && error.response.status) {
                console.log("ERROR", error);
            }

            console.log("error2?", error.response.data);
            throw new ClientRequestError(error.message, 400);
        }
    }
}
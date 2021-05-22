import axios, { AxiosResponse } from 'axios';
import config, { IConfig } from 'config';
import { InternalError } from '@src/util/errors/internal-service';

const ibgeResourceConfig: IConfig = config.get('App.resources.Ibge');

//Error depois que é feito a requisição e deu algum problema
export class ClientRequestError extends InternalError {
    constructor(message: string) {
        const internalMessage = 'Unexpected error when trying to communicate with database';
        super(`${internalMessage}: ${message}`);
    }
}

export interface UserDataBase {
    nome: string,
    cpf: string,
    data_nascimento: string,
    municipio: string
}

export class User {
    constructor(protected request = axios) { }

    public async createUser(nome: string, cpf: string, data_nascimento: string, municipio: string): Promise<UserDataBase> {
        try {
            const response = await axios.post(`${ibgeResourceConfig.get('apiUrl')}`, {});

            const user: UserDataBase = {
                nome: response.data['nome'],
                cpf: response.data['cpf'],
                data_nascimento: response.data['data_nascimento'],
                municipio: response.data['municipio']
            }

            return user;
        } catch (error) {
            if (error.response && error.response.status) {
                console.log("ERROR", error);
            }

            console.log("error2?", error.response.data);
            throw new ClientRequestError(error.message);
        }
    }
}
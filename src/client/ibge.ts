import axios, { AxiosResponse } from 'axios';
import config, { IConfig } from 'config';
import { InternalError } from '@src/util/errors/internal-service';

const ibgeResourceConfig: IConfig = config.get('App.resources.Ibge');

//Error depois que é feito a requisição e deu algum problema
export class ClientRequestError extends InternalError {
    constructor(message: string) {
        const internalMessage = 'Unexpected error when trying to communicate to IBGEService';
        super(`${internalMessage}: ${message}`);
    }
}

export class Ibge {
    constructor(protected request = axios) { }

    public async getCounty(county: string): Promise<AxiosResponse> {
        try {
            const response = await axios.post(`${ibgeResourceConfig.get('apiUrl')}`, {});
            return response.data;
        } catch (error) {
            if (error.response && error.response.status) {
                console.log("ERROR", error);
            }

            console.log("error2?", error.response.data);
            throw new ClientRequestError(error.message);
        }
    }
}
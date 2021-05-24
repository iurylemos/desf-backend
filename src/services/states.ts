import { Ibge } from "@src/clients/ibge";

export interface ResponseRequestEstados {
    estados: any[]
}

export class StateService {
    constructor(protected ibge = new Ibge()) { }

    public async getEstados(): Promise<ResponseRequestEstados> {
        try {
            const estados = await this.ibge.getStates();
            return { estados: estados.data }
        } catch (error) {
            throw new Error(error.message);
        }
    }
}
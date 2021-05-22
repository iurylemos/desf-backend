import { Ibge } from "@src/client/ibge";

export interface ResponseRequestAllMunicipios {
    municipio: string;
}

export interface ResponseRequestMunicipios {
    municipios: any[]
}

export class IbgeService {
    protected ibge = new Ibge();

    public async getMunicipio(id_municipio: string): Promise<ResponseRequestAllMunicipios> {
        const municipio = await this.ibge.getCounty(id_municipio);
        console.log('municipios', municipio);
        return { municipio: municipio.data };
    }

    public async getMunicipios(): Promise<ResponseRequestMunicipios> {
        try {
            const municipios = await this.ibge.getCountys();
            return { municipios: municipios.data }
        } catch (error) {
            throw new Error(error.message);
        }
    }
}
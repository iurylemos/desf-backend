import { Ibge } from "@src/client/ibge";

export interface ResponseRequestMunicipio {
    municipio: string;
}

export interface ResponseRequestMunicipios {
    municipios: any[]
}

export class CountyService {
    constructor(protected ibge = new Ibge()) { }

    public async getMunicipio(id_municipio: string): Promise<ResponseRequestMunicipio> {
        const municipio = await this.ibge.getCounty(id_municipio);
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

    public async getMunicipiosEstado(estado_id: string): Promise<ResponseRequestMunicipios> {
        try {
            const municipios = await this.ibge.getCountyForState(estado_id);
            return { municipios: municipios.data }
        } catch (error) {
            throw new Error(error.message);
        }
    }
}
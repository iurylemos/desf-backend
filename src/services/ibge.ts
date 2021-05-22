import { Ibge } from "@src/client/ibge";

export interface ResponseRequestAllMunicipios {
    municipio: string;
}

export class IbgeService {
    protected ibge = new Ibge();

    public async getMunicipios(municipio: string): Promise<ResponseRequestAllMunicipios> {
        const municipios = await this.ibge.getCounty(municipio);
        console.log('municipios', municipios);
        return { municipio };
    }
}
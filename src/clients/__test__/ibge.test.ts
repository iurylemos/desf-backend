import { Ibge } from '@src/clients/ibge';
import ibgeMunicipios from '@test/fixtures/ibge_municipios.json';
import ibgeEstados from '@test/fixtures/ibge_estados.json';
import * as HTTPUtil from '@src/util/request';
import axios from 'axios';

//Mock para limpar o axios
jest.mock('axios');

describe('Ibge client', () => {
  const mockAxios = axios as jest.Mocked<typeof axios>;

  it('should return the all countys from the IBGE service', async () => {
    //Usando o mock fica assim
    // MockRequest.get.mockResolvedValue({ data: ibgeMunicipios } as HTTPUtil.Response);
    mockAxios.get.mockResolvedValue({ data: ibgeMunicipios });

    const ibge = new Ibge(mockAxios);
    const response = await ibge.getCountys();
    expect(response.data).toEqual(ibgeMunicipios);
  });

  //Dados que não tem todas as chaves, devem ser excluidos
  it('should return all states from the IBGE service', async () => {
    mockAxios.get.mockResolvedValue({ data: ibgeEstados } as HTTPUtil.Response);

    const stormGlass = new Ibge(mockAxios);
    const response = await stormGlass.getStates();

    expect(response.data).toEqual(ibgeEstados);
  });
});
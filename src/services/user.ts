import { User, UserDataBase } from "@src/client/user";

export interface ResponseRequestUsuario {
    usuario: UserDataBase;
}

export class UserService {
    protected user = new User();

    public async createUser(nome: string, cpf: string, data_nascimento: string, municipio: string): Promise<ResponseRequestUsuario> {
        const user = await this.user.createUser(nome, cpf, data_nascimento, municipio);
        console.log('usuárioCriado', user);
        return { usuario: user };
    }

    public async findUsers(): Promise<any> {

    }

    public async findUserById(id: string): Promise<any> {

    }
}
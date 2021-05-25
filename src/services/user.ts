import { MySqlClient } from "@src/clients/mysql";
import { User } from "@src/entity/User";

export interface ResponseRequestUser {
    user: User
}

export class UserService {
    constructor(protected db = new MySqlClient()) { }

    public async createUser(nome: string, cpf: string, data_nascimento: string, municipio: string): Promise<void> {
        try {
            await this.db.createUser(nome, cpf, data_nascimento, municipio);
        } catch (error) {
            throw new Error(error.message);
        }
    }

    public async findUsers(): Promise<User[]> {
        try {
            const users = await this.db.findAll();
            return users;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    public async findUserById(id: string): Promise<User> {
        try {
            const user = await this.db.getOneById(id);
            return user;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    public async updateVacinacaoUser(id: string, status_vacinacao: boolean): Promise<void> {
        try {
            await this.db.updateUser(id, status_vacinacao);
        } catch (error) {
            throw new Error(error.message);
        }
    }

    public async login(cpf: string, data_nascimento: string): Promise<ResponseRequestUser> {
        try {
            const user = await this.db.login(cpf, data_nascimento);
            return { user: user };
        } catch (error) {
            throw new Error(error.message);
        }
    }
}
import { UserClient } from "@src/client/user";
import { User } from "@src/entity/User";

export interface ResponseRequestUser {
    user: User
}
export class UserService {
    constructor(protected user = new UserClient()) { }

    public async createUser(nome: string, cpf: string, data_nascimento: string, municipio: string): Promise<void> {
        try {
            await this.user.createUser(nome, cpf, data_nascimento, municipio);
        } catch (error) {
            throw new Error(error.message);
        }
    }

    public async findUsers(): Promise<User[]> {
        try {
            const users = await this.user.findAll();
            return users;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    public async findUserById(id: string): Promise<User> {
        try {
            const user = await this.user.getOneById(id);
            return user;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    public async updateVacinacaoUser(id: string, status_vacinacao: boolean): Promise<void> {
        try {
            await this.user.updateUser(id, status_vacinacao);
        } catch (error) {
            throw new Error(error.message);
        }
    }

    public async login(cpf: string, data_nascimento: string): Promise<ResponseRequestUser> {
        try {
            const user = await this.user.login(cpf, data_nascimento);
            return { user: user };
        } catch (error) {
            throw new Error(error.message);
        }
    }
}
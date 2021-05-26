import { getRepository } from "typeorm";
import { User } from "../entities/User";

export class UserDB {
    public async createUser(nome: string, cpf: string, data_nascimento: string, municipio: string): Promise<void> {
        try {
            const userRepository = getRepository(User);
            const userDB = new User();
            userDB.nome = nome;
            userDB.cpf = cpf;
            userDB.data_nascimento = data_nascimento;
            userDB.municipio = municipio;

            await userRepository.save(userDB);
        } catch (error) {
            throw new Error(error);
        }
    }

    public async updateUser(id: string, status_vacinacao: boolean): Promise<void> {
        try {
            const userRepository = getRepository(User);
            const user = await userRepository.findOneOrFail(id);
            user.vacinado = status_vacinacao;
            await userRepository.save(user);
        } catch (error) {
            throw new Error(error);
        }
    }

    public async findUsers(): Promise<User[]> {
        try {
            const userRepository = getRepository(User);
            const users = await userRepository.find();
            return users;
        } catch (error) {
            throw new Error(error);
        }
    }

    public async getOneById(id: string): Promise<User> {
        try {
            const userRepository = getRepository(User);
            const user = await userRepository.findOneOrFail(id, {
                select: ["id", "cpf", "nome", "data_nascimento", "municipio", "createdAt"]
            });
            return user;
        } catch (error) {
            throw new Error(error);
        }
    }

    public async login(cpf: string, data_nascimento: string): Promise<User> {
        try {
            const userRepository = getRepository(User);
            const user = await userRepository.findOne({ cpf, data_nascimento });
            if (user) {
                return user;
            } else {
                throw new Error("Usuário inexistente!");
            }

        } catch (error) {
            throw new Error(error);
        }
    }
}
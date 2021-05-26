import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class User1621659319508 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "users",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    },
                    {
                        name: "nome",
                        type: "varchar",
                    },
                    {
                        name: "cpf",
                        type: "varchar",
                    },
                    {
                        name: "municipio",
                        type: "varchar",
                    },
                    {
                        name: "data_nascimento",
                        type: "varchar",
                    },
                    {
                        name: "vacinado",
                        type: "boolean",
                        default: true
                    },
                    {
                        name: "createdAt",
                        type: "timestamp",
                        default: 'now()'
                    },
                    {
                        name: "updatedAt",
                        type: "timestamp",
                        default: 'now()'
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}

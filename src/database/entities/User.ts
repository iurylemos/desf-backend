import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Unique } from "typeorm";

@Entity('users')
@Unique(["cpf"])
export class User {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    nome!: string;

    @Column()
    cpf!: string;

    @Column()
    data_nascimento!: string;

    @Column()
    municipio!: string;

    @Column({ default: false })
    vacinado!: boolean;

    @Column()
    @CreateDateColumn()
    createdAt!: Date;

    @Column()
    @UpdateDateColumn()
    updatedAt!: Date;
}
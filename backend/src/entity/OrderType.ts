import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class OrderType {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;
}

import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class PaymentType {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;
}

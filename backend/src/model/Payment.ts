import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, BaseEntity } from "typeorm";
import { Order } from "./Order";

@Entity()
export class Payment extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Order, order => order.payments)
    order: Order;

    @Column("decimal", { precision: 10, scale: 2 })
    amount: number;

    @Column()
    payment_method: string;

    @Column()
    payment_date: Date;

    @Column()
    status: string;
}
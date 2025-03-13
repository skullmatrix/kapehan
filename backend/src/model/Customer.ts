import { Entity, PrimaryGeneratedColumn, Column, OneToMany, BaseEntity } from "typeorm";
import { Order } from "./Order";
import { Invoice } from "./Invoice";

@Entity()
export class Customer extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(() => Order, order => order.customer)
    orders: Order[];

    @OneToMany(() => Invoice, invoice => invoice.customer)
    invoices: Invoice[];
}
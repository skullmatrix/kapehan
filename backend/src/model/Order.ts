import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, BaseEntity } from "typeorm";
import { Customer } from "./Customer";
import { Invoice } from "./Invoice";
import { OrderItem } from "./OrderItem";
import { Payment } from "./Payment";

@Entity()
export class Order extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Customer, customer => customer.orders)
    customer: Customer;

    @Column()
    order_date: Date;

    @Column("decimal", { precision: 10, scale: 2 })
    total_amount: number;

    @Column()
    status: string;

    @OneToMany(() => Invoice, invoice => invoice.order)
    invoices: Invoice[];

    @OneToMany(() => OrderItem, orderItem => orderItem.order)
    orderItems: OrderItem[];

    @OneToMany(() => Payment, payment => payment.order)
    payments: Payment[];
}
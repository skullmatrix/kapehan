import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, BaseEntity } from "typeorm";
import { Order } from "./Order";
import { Customer } from "./Customer";

@Entity()
export class Invoice extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Order, order => order.invoices)
    order: Order;

    @ManyToOne(() => Customer, customer => customer.invoices)
    customer: Customer;

    @Column()
    customer_name: string;

    @Column()
    invoice_date: Date;

    @Column("decimal", { precision: 10, scale: 2 })
    total_amount: number;

    @Column()
    payment_method: string;

    @Column()
    payment_status: string;

    @Column()
    status: string;
}
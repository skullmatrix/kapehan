import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { OrderType } from "./OrderType";
import { PaymentType } from "./PaymentType";

@Entity()
export class Invoice {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    orderNumber: string;

    @Column()
    customerName: string;

    @Column()
    orderDate: Date;

    @Column("decimal", { precision: 10, scale: 2 })
    total: number;

    @Column("decimal", { precision: 10, scale: 2 })
    tax: number;

    @Column("decimal", { precision: 10, scale: 2 })
    grandTotal: number;

    @ManyToOne(() => OrderType)
    @JoinColumn()
    orderType: OrderType;

    @ManyToOne(() => PaymentType)
    @JoinColumn()
    paymentType: PaymentType;
}

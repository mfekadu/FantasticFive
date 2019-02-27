import { Column, Entity, Index, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Shipping, Billing } from "../entity";
@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  public orderNumber!: number;

  @Column()
  public status!: number;

  @Column()
  public shippingYN!: boolean;

  @OneToOne((type) => Shipping, { cascade: true })
  @JoinColumn()
  public shipping!: Shipping;

  @OneToOne((type) => Billing, { cascade: true })
  @JoinColumn()
  public billing!: Billing;
}
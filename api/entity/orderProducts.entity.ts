import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "../entity";
@Entity()
export class OrderProducts {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column()
  public orderQuantity!: number;

  @Column()
  public orderPrice!: number;

  @Column()
  public orderNumber!:  number;

  @Column()
  public productId!: number;

  // @OneToOne((type) => Product, { cascade: true })
  // @JoinColumn()
  // public product!: Product;
}
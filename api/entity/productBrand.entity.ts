import { Column, Entity, OneToMany, JoinColumn, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "../entity";

@Entity()
export class ProductBrand {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column()
  public name!: string;

  @OneToMany(type => Product, product => product.brand)
  products!: Product[];
}

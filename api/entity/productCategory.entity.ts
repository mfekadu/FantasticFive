import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ProductCategory {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column()
  public name!: string;
}
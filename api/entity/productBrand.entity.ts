import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ProductBrand {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column()
  public name!: string;
}

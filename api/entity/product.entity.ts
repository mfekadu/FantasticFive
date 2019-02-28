import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column()
  public title!: string;

  @Column()
  public desc!: string;

  @Column()
  public quantity!: number;

  @Column()
  public price!: string;

  @Column({default: null})
  public photoURL!: string;
}

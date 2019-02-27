import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
@Entity()
export class Billing {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column()
  public firstName!: string;
  
  @Column()
  public lastName!: string;

  @Column()
  public cardNumber!: string;

  @Column()
  public expiration!: string;

  @Column()
  public cvv!: string;
}
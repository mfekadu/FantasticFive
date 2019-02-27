import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
@Entity()
export class Shipping {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column()
  public firstName!: string;
  
  @Column()
  public lastName!: string;

  @Column()
  public address1!: string;

  @Column()
  public address2!: string;

  @Column()
  public city!: string;

  @Column()
  public state!: string;

  @Column()
  public zip!: string;
}
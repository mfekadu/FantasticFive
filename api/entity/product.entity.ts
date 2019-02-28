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
  public price!: number;

// should there be an array here ??
// should there be a relationship to a Category Entity ??
// ... it should be a ManyToMany
// ... typeorm
// ... Question Category is the same thing in the docs
// ... 

  @Column({default: null})
  public photoURL!: string;
}

import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column()
  public title!: string;

  @Column({default: null})
  public desc!: string;

  // should there be an array here ??
  // should there be a relationship to a Category Entity ??
  // ... it should be a ManyToMany
  // ... typeorm
  // ... Question Category is the same thing in the docs
  // ... 

  @Column()
  public brand!: string; /* compare brand.toLower() before saving */
  
  @Column()
  public category!: string; /* for now this is just 1 category, but need allow for Many */

  // @Column()
  // public categories!: ???????;

  @Column()
  public quantity!: number;

  @Column()
  public price!: number;

  @Column()
  public saleYN!: boolean; /* is it on sale? */

  @Column()
  public salesPrice!: number;  /* what is the sale price? salesPrice < price */

  @Column()
  public canShipYN!: boolean;

  @Column({default: null})
  public photoURL!: string;
}

import { Column, Entity, PrimaryGeneratedColumn, OneToOne, ManyToMany, JoinColumn, JoinTable } from "typeorm";
import { ProductCategory, ProductBrand } from "../entity";

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column()
  public title!: string;

  @Column({default: null})
  public desc!: string;

  @OneToOne((type) => ProductBrand, { cascade: true })
  @JoinColumn()
  public brand!: ProductBrand; /* compare brand.toLower() before saving */
  
  @ManyToMany(type => ProductCategory)
  @JoinTable()
  public categories!: ProductCategory[];

  @Column()
  public stock!: number;

  // true by default and set to false if deleted
  @Column({default: true})
  public isActive!: boolean;

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

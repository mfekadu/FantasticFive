import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Announcement {
    @PrimaryGeneratedColumn()
    public id!: number;

    @Column()
    public title!: string;

    @Column({length: 9001})
    public desc!: string;
}
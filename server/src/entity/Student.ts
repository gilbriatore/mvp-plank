import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Enrollment } from "./Enrollment";
import { Submission } from "./Submission";

@Entity()
export class Student {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({length: 120 })
    name!: string;

    @Column({length: 160, unique: true})
    email!: string;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

    @OneToMany(() => Enrollment, e => e.student)
    enrollments!: Enrollment[];

    @OneToMany(() => Submission, s => s.student)
    submissions!: Submission[];
    
}
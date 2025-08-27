import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Enrollment } from "./Enrollment";
import { Assignment } from "./Assignment";

@Entity()
export class Course {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({length: 20, unique: true})
    code!: string;

    @Column({ length: 120 })
    title!: string;  

    @Column({ type: "text", nullable: true })
    description?: string;

    @Column({ default: true })
    active!: boolean; 

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

    @OneToMany(() => Enrollment, e => e.course)
    enrollments!: Enrollment[];

    @OneToMany(() => Assignment, a => a.course)
    assignments!: Assignment[];
}
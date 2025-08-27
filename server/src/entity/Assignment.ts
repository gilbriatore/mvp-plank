import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Course } from "./Course";

@Entity()
export class Assignment {

    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => Course, c => c.assignments, {
        eager: true, 
        onDelete: "CASCADE"
    })   
    course!: Course;

    @Column({length: 140})
    title!: string;

    @Column({ type: "text", nullable: true })
    description?: string;

    @Column({type: "datetime", nullable: true})
    dueDate?: Date;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;
}
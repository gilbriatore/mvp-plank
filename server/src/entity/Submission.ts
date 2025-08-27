import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm";
import { Assignment } from "./Assignment";
import { Student } from "./Student";

@Entity()
@Unique(["assignment", "student"])
export class Submission {

    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => Assignment, {eager: true, onDelete: "CASCADE"} )
    assignment!: Assignment;

    @ManyToOne(() => Student, s=> s.submissions, {eager: true, onDelete: "CASCADE"})
    student!: Student;

    @Column({type: "text"})
    content!: string;

    @Column({ type: "float", nullable: true})
    grade?: number;

    @CreateDateColumn()
    submittedAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;
}
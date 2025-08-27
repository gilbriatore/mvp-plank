import { CreateDateColumn, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn, Unique } from "typeorm";
import { Student } from "./Student";
import { Course } from "./Course";

@Entity()
@Unique(["student", "course"])
export class Enrollment {

    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => Student, s => s.enrollments, {eager: true, onDelete: "CASCADE"})
    student!: Student;

    @ManyToOne(() => Course, c => c.enrollments, { eager: true, onDelete: "CASCADE"})
    course!: Course;

    @CreateDateColumn()
    enrollAt!: Date;

}
import z from "zod";
import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Enrollment } from "../entity/Enrollment";
import { Student } from "../entity/Student";
import { Course } from "../entity/Course";

const repo = AppDataSource.getRepository(Enrollment);

const schema = z.object({
    studentId: z.number().int().positive(),
    courseId: z.number().int().positive()
});

export async function enroll(req:Request, res: Response) {
    const { studentId, courseId } = schema.parse(req.body);
    const student = await AppDataSource.getRepository(Student).findOneBy({id: studentId});
    const course = await AppDataSource.getRepository(Course).findOneBy({id: courseId});
    if (!student || !course) return res.status(404).json({message: "Student or Course not found"});

    const saved = await repo.save(repo.create({student: student, course: course}));
    res.status(204).send(saved);
}

export async function unenroll(req: Request, res: Response){
    const id = Number(req.params.id);
    const enroll = await repo.delete({id});
    if (!enroll.affected) return res.status(404).json({message: "Enrollment not found"});
    res.status(204).send();
}
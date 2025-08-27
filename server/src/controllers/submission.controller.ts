import z from "zod";
import { AppDataSource } from "../data-source";
import { Submission } from "../entity/Submission";
import { Assignment } from "../entity/Assignment";
import { Student } from "../entity/Student";
import { Request, Response } from "express";

const repo = AppDataSource.getRepository(Submission);

const createSchema = z.object({
    assignmentId: z.number().int().positive(),
    studentId: z.number().int().positive(),
    content: z.string().min(1)
});

const gradeSchema = z.object({
    grade: z.number().min(0).max(10)
});

export async function submit(req:Request, res: Response) {
    const { assignmentId, studentId, content } = createSchema.parse(req.body);
    const assignment = await AppDataSource.getRepository(Assignment).findOneBy({id: assignmentId});
    const student = await AppDataSource.getRepository(Student).findOneBy({id: studentId});
    if (!assignment || !student) return res.status(404).json({message: "Assignment or Student not found"});

    const saved = await repo.save(repo.create({assignment: assignment, student: student, content: content}));
    res.status(201).json(saved);
}

export async function grade(req: Request, res: Response) {
    const id = Number(req.params.id);
    const data = gradeSchema.parse(req.body);
    const submission = await repo.findOneBy({ id });
    if (!submission) return res.status(404).json({ message: "Submission not found"});

    await repo.update({ id }, data);
    res.json(await repo.findOneBy( { id }));
}
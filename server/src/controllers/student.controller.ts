import z, { email } from "zod";
import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Student } from "../entity/Student";
import { ILike } from "typeorm";

const repo = AppDataSource.getRepository(Student);

const createSchema = z.object({
    name: z.string().min(1).max(120),
    email: z.email().max(160)
});

export async function list(req: Request, res: Response){
    const page = Math.max(1, Number(req.query.page) || 1);
    const size = Math.min(50, Math.max(1, Number(req.query.size) || 10));
    const q = (req.query.q as string) || "";
    const where = q ? [{name: ILike(`%${q}`)}, {email: ILike(`%{q}`)}] : {};
    const [items, total] = await repo.findAndCount({
        where,
        order: {createdAt: "desc"},
        skip: (page -1) * size,
        take: size
    });
    res.json({page, size, total, items});
}

export async function get(req: Request, res: Response){
    const id = Number(req.params.id);
    const student = await repo.findOneBy({ id });
    if (!student) return res.status(404).json({message: "Student no found!"});
    res.json(student);
}

export async function create(req: Request, res: Response){
    const data = createSchema.parse(req.body);
    const saved = await repo.save(repo.create(data));
    res.status(201).json(saved);
}

export async function update(req: Request, res: Response){
    const id = Number(req.params.id);
    const student = await repo.findOneBy({id});
    if(!student) return res.status(404).json({message: "Student not found"});
    const data = createSchema.partial().parse(req.body);
    await repo.update({id}, data);
    res.json(await repo.findOneBy({id}));
}

export async function remove(req:Request, res: Response) {
    const id = Number(req.params.id);
    const r = await repo.delete({id});
    if (!r.affected) return res.status(404).json({message: "Student not found"});
    res.status(204).send();
}


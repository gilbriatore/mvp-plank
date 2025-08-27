import { DataSource } from "typeorm";
import { Student } from "./entity/Student";
import { Course } from "./entity/Course";
import { Enrollment } from "./entity/Enrollment";
import { Assignment } from "./entity/Assignment";
import { Submission } from "./entity/Submission";

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: "dev.db",
    synchronize: true,
    logging: false,
    entities: [Student, Course, Enrollment, Assignment, Submission]
});
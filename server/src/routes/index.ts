import { Router } from "express";
import * as student from "../controllers/student.controller";
import * as enrollment from "../controllers/enrollment.controller";
import * as submission from "../controllers/submission.controller";
import * as course from "../controllers/course.controller";
import * as assignment from "../controllers/assignment.controller";

const router = Router();

router.get("/students", student.list);
router.get("/students/:id", student.get);
router.post("/students", student.create);
router.put("/students/:id", student.update);
router.delete("/students/:id", student.remove);

router.post("/enrollments", enrollment.enroll);
router.delete("/enrollments/:id", enrollment.unenroll);

router.post("/submissions", submission.submit);
router.put("/submissions/id:grade", submission.grade);

router.get("/courses", course.list);
router.get("/courses/:id", course.get);
router.post("/courses", course.create);
router.put("/courses/:id", course.update);
router.delete("/course/:id", course.remove);

router.get("/assignments", assignment.list);
router.get("/assignments/:id", assignment.get);
router.post("/assignments", assignment.create);
router.put("/assignments/:id", assignment.update);
router.delete("/assignments/:id", assignment.remove);

export default router;
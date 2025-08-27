import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";

export function errorHandler(err:unknown, _req: Request, 
     res:Response, _next: NextFunction) {

    if (err instanceof ZodError){
        return res.status(400).json({message: "Validation error", 
            issues: err.issues});
    }
    console.error(err);
    res.status(500).json({message: "Internal server Error"});
}
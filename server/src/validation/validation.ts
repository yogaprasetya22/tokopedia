import { z, ZodSchema } from "zod"; // ZodSchema is used to type the schema
import { ResponseError } from "../error/response-error";
import { Request } from "express";

const validate = (schema: ZodSchema, request: Request): any => {
    const result = schema.safeParse(request);
    if (!result.success) {
        const errorMessage = result.error.errors
            .map((err) => err.message)
            .join(", ");
        throw new ResponseError(400, errorMessage);
    } else {
        return result.data; 
    }
};

export { validate };

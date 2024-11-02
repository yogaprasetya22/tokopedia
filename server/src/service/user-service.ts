import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response-error";
import bcrypt from "bcrypt";
import { Request } from "express";
import { validate } from "../validation/validation";
import {
    loginUserValidation,
    registerUserValidation,
} from "../validation/user-validation";

const register = async (request: Request) => {
    const user = validate(registerUserValidation, request);

    const countUser = await prismaClient.user.count({
        where: {
           email: user.email,
        },
    });

    if (countUser === 1) {
        return new ResponseError(400, "Email already registered");
    }

    user.password = await bcrypt.hash(user.password, 10);

    return prismaClient.user.create({
        data: user,
        select: {
            id: true,
            email: true,
            displayName: true,
        },
    });
};

// login passport bearer
const login = async (request: Request) => {
    const user = validate(loginUserValidation, request);
    return user;
};

const currentUser = async (request: Request) => {
    return request.user
};

export default {
    register,
    login,
    currentUser,
};

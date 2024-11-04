import { NextFunction, Request, Response } from "express";
import userService from "../service/user-service";
import catchAsync from "../utils/catchAsync";

const ping = catchAsync(async (req: Request, res: Response) => {
    res.status(200).json({
        message: "pong",
    });
});

const googleAuthCallback = catchAsync(async (req: Request, res: Response) => {
    res.redirect(`${process.env.CLIENT_URL}/`);
});

const register = async (req: Request, res: Response) => {
    const result = await userService.register(req.body);
    res.status(200).json({
        data: result,
    });
};

const login = catchAsync(async (req: Request, res: Response) => {
    const result = await userService.login(req.body);
    res.status(200).json({
        data: result,
    });
});

const cuurentUser = catchAsync(async (req: Request, res: Response) => {
    const result = await userService.currentUser(req);
    res.status(200).json(result);
});

const logout = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        req.session.destroy(function () {
            res.clearCookie("connect.sid");
            res.redirect("/");
        });
    }
);

export default {
    register,
    login,
    cuurentUser,
    logout,
    googleAuthCallback,
    ping,
};

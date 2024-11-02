import { Request, Response, NextFunction } from "express";
import passport from "passport";

const isAuthtenticated = (req: Request, res: Response, next: NextFunction) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.status(401).json({
        message: "You are not authenticated",
    });
};

export { isAuthtenticated };

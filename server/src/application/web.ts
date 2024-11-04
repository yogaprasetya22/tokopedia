import express from "express";
import { publicRouter } from "../route/public-api";
import { userRouter } from "../route/api";
import { errorMiddleware } from "../middleware/error-middleware";
import session from "express-session";
import cors from "cors";
import passport from "passport";
import helmet from "helmet";

import "./passport";
import "./cloudinary";
import { prismaClient } from "./database";
import { PrismaSessionStore } from "@quixo3/prisma-session-store";

export const web = express();

web.use(
    cors({
        origin: "*",
        credentials: true,
    })
);

web.use(express.json());
web.use(helmet());

web.use(
    session({
        secret: process.env.SESSION_SECRET!,
        resave: false,
        saveUninitialized: false,
        store: new PrismaSessionStore(prismaClient, {
            dbRecordIdIsSessionId: true,
        })
            .on("create", (session) => {
                console.log("Session created:", session);
            })
            .on("read", (session) => {
                console.log("Session read:", session);
            }),

        cookie: {
            secure: process.env.NODE_ENV === "production", // true di production
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 hari
        },
    })
);

web.use(passport.initialize());
web.use(passport.session());

web.use(publicRouter);
web.use(userRouter);

web.use(errorMiddleware);

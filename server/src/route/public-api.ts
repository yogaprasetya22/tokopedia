import express from "express";
import userController from "../controller/user-controller";
import productController from "../controller/product-controller";
import passport from "passport";

const publicRouter = express.Router();
publicRouter.post("/api/users", userController.register);
publicRouter.get("/api/v1/category", productController.getCategory);
publicRouter.get("/api/v1/catalogue", productController.getCatalogue);
publicRouter.get("/api/v1/:slug", productController.getTokoProduct);
publicRouter.get("/api/v1/:toko/:slug", productController.getCatalogueBySlug);
publicRouter.get("/", userController.ping);

publicRouter.get(
    "/api/users/login",
    passport.authenticate("local"),
    (req, res) => {
        res.status(200).json(req.user);
    }
);

// auth google
publicRouter.get(
    "/auth/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
);

publicRouter.get(
    "/auth/google/callback",
    passport.authenticate("google", { failureRedirect: "/login" }),
    userController.googleAuthCallback
);

export { publicRouter };

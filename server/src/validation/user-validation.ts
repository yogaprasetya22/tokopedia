import { z } from "zod";

const registerUserValidation = z.object({
    googleId: z.string().optional(), // Optional field
    email: z.string().email(), // Required and must be a valid email
    displayName: z.string().nonempty(), // Required field
    profilePicture: z.string().optional(), // Optional field
    isPremium: z.boolean().optional().default(false), // Optional with default false
    password: z
        .string()
        .max(100)
        .refine((value) => value.length >= 8, {
            message: "password must be at least 8 characters",
        }),
});

const loginUserValidation = z.object({
    email: z.string().max(100).email(),
    password: z.string().max(100),
});

const getUserValidation = z.string().max(100);

const updateUserValidation = z.object({
    googleId: z.string().optional(), // Optional on update
    email: z.string().email().optional(),
    displayName: z.string().optional(),
    profilePicture: z.string().optional(),
    isPremium: z.boolean().optional(),
    password: z
        .string()
        .max(100)
        .optional()
        .refine((value) => !value || value.length >= 8, {
            message: "password must be at least 8 characters",
        }),
});

export {
    registerUserValidation,
    loginUserValidation,
    getUserValidation,
    updateUserValidation,
};

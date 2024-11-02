import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcrypt";
import { prismaClient } from "./database";

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
            callbackURL: "/auth/google/callback",
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                const user = await prismaClient.user.upsert({
                    where: { googleId: profile.id },
                    update: {},
                    create: {
                        googleId: profile.id,
                        email: profile.emails![0].value,
                        displayName: profile.displayName,
                        profilePicture: profile.photos![0].value,
                    },
                });

                done(null, user);
            } catch (error) {
                return done(error as Error, false);
            }
        }
    )
);

passport.use(
    new LocalStrategy(
        { usernameField: "email" }, // Menggunakan email sebagai field untuk username
        async (username, password, done) => {
            try {
                // Mencari user berdasarkan email (username)
                const user = await prismaClient.user.findFirst({
                    where: { email: username },
                });

                if (!user) {
                    // User tidak ditemukan
                    return done(null, false, { message: "Incorrect email." });
                }

                if (!user.password) {
                    // Jika password belum diatur
                    return done(null, false, {
                        message: "No password set for this user.",
                    });
                }

                // Membandingkan password yang dimasukkan dengan hash password di database
                const valid = await bcrypt.compare(password, user.password);

                if (!valid) {
                    // Password salah
                    return done(null, false, {
                        message: "Incorrect password.",
                    });
                }

                return done(null, user);
            } catch (error) {
                return done(error as Error, false);
            }
        }
    )
);

passport.serializeUser((user: any, done) => {
    done(null, user.id); // Menyimpan ID pengguna ke sesi
});

passport.deserializeUser(async (id: string, done) => {
    try {
        const user = await prismaClient.user.findUnique({
            where: { id },
        });
        done(null, user); // Mengambil user berdasarkan ID dari sesi
    } catch (err) {
        done(err);
    }
});

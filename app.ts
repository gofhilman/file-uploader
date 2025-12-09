import "dotenv/config";
import "./config/passport";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { prisma } from "./lib/prisma";
import { PrismaSessionStore } from "@quixo3/prisma-session-store";
import session from "express-session";
import passport from "passport";
import indexRouter from "./routes/indexRouter";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

const prismaSessionStore = new PrismaSessionStore(prisma, {
  checkPeriod: 30 * 60 * 1000, // 30 mins
  dbRecordIdIsSessionId: true,
});

app.use(
  session({
    secret:
      process.env.SESSION_SECRET ??
      (() => {
        throw new Error("SESSION_SECRET missing");
      })(),
    resave: false,
    saveUninitialized: false,
    store: prismaSessionStore,
    cookie: {
      maxAge: 7 * 24 * 3600 * 1000, // 1 week
    },
  })
);

app.use(passport.session());

app.use(indexRouter);

app.use((err: any, _: any, res: any, __: any) => {
  console.error(err);
  res.status(err.statusCode || 500).send(err.message);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, (error) => {
  if (error) throw error;
  console.log(`Server running on port ${PORT}`);
});

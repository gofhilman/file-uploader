import { PrismaSessionStore } from "@quixo3/prisma-session-store";
import "dotenv/config";
import express from "express";
import path from "node:path";
import { prisma } from "./lib/prisma";
import session from "express-session";

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

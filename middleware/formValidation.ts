import { body } from "express-validator";
import { prisma } from "../lib/prisma";

const validateLogin = [
  body("username")
    .trim()
    .notEmpty()
    .withMessage(
      "Trying to log in without a username? Sweetie, we need to know " +
        "who's knocking before we open the velvet rope."
    ),
  body("password")
    .trim()
    .notEmpty()
    .withMessage(
      "No password? This isn't a casual stroll, it's a secured entrance. " +
        "Flash the credentials or sashay away!"
    ),
];

const validateSignup = [
  body("username")
    .trim()
    .notEmpty()
    .withMessage(
      "You're registering, darling. That means choosing a name that slaps, " +
        "sparkles, and screams main character energy. Don't ghost us!"
    )
    .custom(async (value) => {
      const user = await prisma.user.findUnique({
        where: {
          username: value,
        },
      });
      if (user) {
        throw new Error(
          "That username's already booked and busy, darling. Try something with more sparkle!"
        );
      }
      return true;
    }),
  body("password")
    .trim()
    .notEmpty()
    .withMessage(
      "A new account without a password? That's like wearing heels with no attitude. " +
        "Lock it down, secure your sparkle, and strut into the system!"
    ),
];

const validateFolderName = [
  body("folderName")
    .trim()
    .notEmpty()
    .withMessage(
      "Darling, the folder needs a name, not a ghost. Give her identity, " +
        "or she's not stepping onto the stage."
    ),
];

export { validateLogin, validateSignup, validateFolderName };

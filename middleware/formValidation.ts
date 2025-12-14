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
      "Darling, this folder needs a name, not a ghost. Give her identity, " +
        "or she's not stepping onto the stage."
    )
    .custom(async (value, { req }) => {
      const folder = await prisma.folder.findUnique({
        where: {
          name_parentId_userId: {
            name: value,
            parentId: req.params?.folderId,
            userId: req.user.id,
          },
        },
      });
      if (folder) {
        throw new Error(
          "That name's already booked and busy, darling. Try something with more sparkle!"
        );
      }
      return true;
    }),
];

const validateFileName = [
  body("fileName")
    .trim()
    .notEmpty()
    .withMessage(
      "Darling, this file needs a name, not a ghost. Give her identity, " +
        "or she's not stepping onto the stage."
    )
    .custom(async (value, { req }) => {
      const file = await prisma.file.findUnique({
        where: {
          name_folderId_userId: {
            name: value,
            folderId: req.params?.folderId,
            userId: req.user.id,
          },
        },
      });
      if (file) {
        throw new Error(
          "That name's already booked and busy, darling. Try something with more sparkle!"
        );
      }
      return true;
    }),
];

const validateFile = [
  body("file").custom(async (value, { req }) => {
    if (!req.file) {
      throw new Error("Honey, don't play shy, upload that file!");
    }
    // Max file size: 100 MB
    if (req.file.size > 100 * 1024 * 1024) {
      throw new Error("File too thicc, darling. Slim it down to 100 MB max!");
    }
    const file = await prisma.file.findUnique({
      where: {
        name_folderId_userId: {
          name: req.file.filename,
          folderId: req.params?.folderId,
          userId: req.user.id,
        },
      },
    });
    if (file) {
      throw new Error(
        "That name's already booked and busy, darling. Try something with more sparkle!"
      );
    }
    return true;
  }),
];

export {
  validateLogin,
  validateSignup,
  validateFolderName,
  validateFileName,
  validateFile,
};

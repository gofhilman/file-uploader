import { validationResult } from "express-validator";
import { prisma } from "../lib/prisma";
import passport from "passport";
import bcrypt from "bcryptjs";

async function redirectIndex(req: any, res: any) {
  const root = await prisma.folder.findFirst({
    where: {
      parentId: null,
      userId: req.user.id,
    },
    select: {
      id: true,
    },
  });
  res.redirect(`/${root?.id}`);
}

async function folderGet(req: any, res: any) {
  const folder = await prisma.folder.findUnique({
    where: {
      id: req.params.folderId,
    },
    include: {
      childFolders: true,
      files: true,
      shared: true,
    },
  });
  res.render("main-layout", {
    folder,
    page: "index",
    title: folder?.name,
  });
}

async function loginFormGet(_: any, res: any) {
  res.render("main-layout", { page: "login", title: "Login" });
}

function signupFormGet(_: any, res: any) {
  res.render("main-layout", {
    page: "signup",
    title: "Signup",
  });
}

function loginFormPost(req: any, res: any, next: any) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).render("main-layout", {
      page: "login",
      title: "Login",
      errors: errors.array(),
    });
  }
  passport.authenticate("local", (err: any, user: any, info: any) => {
    if (err) return next(err);
    if (!user) {
      return res.render("main-layout", {
        page: "login",
        title: "Login",
        message: info?.message || "Login failed",
      });
    }
    req.login(user, (err: any) => {
      if (err) return next(err);
      return res.redirect("/");
    });
  })(req, res, next);
}

async function signupFormPost(req: any, res: any, next: any) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).render("main-layout", {
      page: "signup",
      title: "Signup",
      errors: errors.array(),
    });
  }
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    await prisma.user.create({
      include: {
        folders: true,
      },
      data: {
        username: username,
        password: hashedPassword,
        folders: {
          create: {
            name: "Drive",
          },
        },
      },
    });
    res.redirect("/");
  } catch (err) {
    next(err);
  }
}

async function createFolderPost(req: any, res: any) {
  const folder = await prisma.folder.findUnique({
    where: {
      id: req.params.folderId,
    },
    include: {
      childFolders: true,
      files: true,
      shared: true,
    },
  });
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).render("main-layout", {
      folder,
      page: "index",
      title: folder?.name,
      errors: errors.array(),
    });
  }
  const { folderName } = req.body;
  await prisma.folder.create({
    data: {
      name: folderName,
      parentId: req.params.folderId,
      userId: req.user.id,
    },
  });
  res.redirect(`/${req.params.folderId}`);
}

async function renameFolderPost(req: any, res: any) {
  const folder = await prisma.folder.findUnique({
    where: {
      id: req.params.folderId,
    },
    include: {
      childFolders: true,
      files: true,
      shared: true,
    },
  });
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).render("main-layout", {
      folder,
      page: "index",
      title: folder?.name,
      errors: errors.array(),
    });
  }
  const { folderName } = req.body;
  await prisma.folder.update({
    where: {
      id: req.params.folderId,
    },
    data: {
      name: folderName,
    },
  });
  res.redirect(`/${req.params.folderId}`);
}

async function deleteFolderPost(req: any, res: any) {
  const parentId = (
    await prisma.folder.findUnique({
      where: {
        id: req.params.folderId,
      },
      select: {
        parentId: true,
      },
    })
  )?.parentId;
  await prisma.folder.delete({
    where: {
      id: req.params.folderId,
    },
  });
  res.redirect(`/${parentId}`);
}

export {
  redirectIndex,
  folderGet,
  loginFormGet,
  signupFormGet,
  loginFormPost,
  signupFormPost,
  createFolderPost,
  renameFolderPost,
  deleteFolderPost,
};

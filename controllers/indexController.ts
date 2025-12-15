import { validationResult } from "express-validator";
import { prisma } from "../lib/prisma";
import passport from "passport";
import bcrypt from "bcryptjs";
import multer from "multer";
import { createClient } from "@supabase/supabase-js";
import { Writable } from "node:stream";

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
      createFolderErrors: errors.array(),
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
      renameFolderErrors: errors.array(),
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

// Save to disk
// const storage = multer.diskStorage({
//   destination: "tmp/uploads",
//   filename: function (req, file, cb) {
//     cb(null, file.originalname);
//   },
// });

// Save to memory as a buffer
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: { fileSize: 50 * 1024 * 1024 }, // Max file size: 50 MB
}).single("file");

function uploadFile(req: any, res: any, next: any) {
  upload(req, res, async (err) => {
    if (err) {
      const errors = [{ msg: err.message }];
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
      return res.status(400).render("main-layout", {
        folder,
        page: "index",
        title: folder?.name,
        uploadFileErrors: errors,
      });
    }
    next();
  });
}

const supabase = createClient(
  "https://bdgsonubwvppjcjqkuqf.supabase.co",
  process.env.SUPABASE_KEY ??
    (() => {
      throw new Error("SUPABASE_KEY missing");
    })()
);

async function recordFilePost(req: any, res: any) {
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
      uploadFileErrors: errors.array(),
    });
  }
  const supabaseFilePath = req.params.folderId + "/" + req.file.originalname;
  await supabase.storage
    .from("file-uploader")
    .upload(supabaseFilePath, req.file.buffer, {
      contentType: req.file.mimetype,
    });
  const {
    data: { publicUrl },
  } = supabase.storage.from("file-uploader").getPublicUrl(supabaseFilePath);
  await prisma.file.create({
    data: {
      name: req.file.originalname,
      url: publicUrl,
      size: req.file.size,
      userId: req.user.id,
      folderId: req.params.folderId,
    },
  });
  res.redirect(`/${req.params.folderId}`);
}

async function downloadFileGet(req: any, res: any) {
  const file = await prisma.file.findUnique({
    where: {
      id: req.params.fileId,
    },
    select: {
      name: true,
      url: true,
    },
  });
  const response = await fetch(
    file?.url ??
      (() => {
        throw new Error("URL is undefined");
      })()
  );
  res.attachment(file.name);
  const webWritable = Writable.toWeb(res);
  await response.body?.pipeTo(webWritable);
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
  uploadFile,
  recordFilePost,
  downloadFileGet,
};

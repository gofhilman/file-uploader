import { prisma } from "../lib/prisma";

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

export { redirectIndex, folderGet, loginFormGet, signupFormGet };

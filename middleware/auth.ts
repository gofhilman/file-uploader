import { prisma } from "../lib/prisma";

export async function isAuthFolder(req: any, res: any, next: any) {
  const folder = await prisma.folder.findUnique({
    where: {
      id: req.params.folderId,
    },
    select: {
      shared: true,
    },
  });
  const isShared = !!folder?.shared && folder.shared.expiresAt > new Date();
  if (isShared) {
    return next();
  }
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(401).redirect("/login");
  }
}

export async function isAuthFile(req: any, res: any, next: any) {
  const file = await prisma.file.findUnique({
    where: {
      id: req.params.fileId,
    },
    select: {
      folder: {
        select: {
          shared: true,
        },
      },
    },
  });
  const isShared =
    !!file?.folder.shared && file.folder.shared.expiresAt > new Date();
  if (isShared) {
    return next();
  }
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(401).redirect("/login");
  }
}

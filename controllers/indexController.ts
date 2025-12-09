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



export {redirectIndex}

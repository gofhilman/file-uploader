import { Router } from "express";

const indexRouter = Router();

indexRouter.get("/");
indexRouter.get("/:folderId");
indexRouter.get("/:fileId/download");
indexRouter.get("/login");
indexRouter.get("/signup");

indexRouter.post("/:folderId/create-folder");
indexRouter.post("/:folderId/upload-file");
indexRouter.post("/:folderId/rename");
indexRouter.post("/:folderId/delete");
indexRouter.post("/:folderId/share");
indexRouter.post("/:fileId/rename");
indexRouter.post("/:fileId/delete");
indexRouter.post("/login");
indexRouter.post("/signup");

export default indexRouter;

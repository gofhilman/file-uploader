import { Router } from "express";
import isAuth from "../middleware/auth";
import { redirectIndex } from "../controllers/indexController";

const indexRouter = Router();

indexRouter.get("/", isAuth, redirectIndex);
indexRouter.get("/:folderId", isAuth);
indexRouter.get("/:fileId/download", isAuth);
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

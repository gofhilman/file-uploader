import { Router } from "express";
import isAuth from "../middleware/auth";
import {
  folderGet,
  loginFormGet,
  redirectIndex,
  signupFormGet,
} from "../controllers/indexController";

const indexRouter = Router();

indexRouter.get("/", isAuth, redirectIndex);
indexRouter.get("/login", loginFormGet);
indexRouter.get("/signup", signupFormGet);
indexRouter.get("/:fileId/download", isAuth);
indexRouter.get("/:folderId", isAuth, folderGet);

// indexRouter.post("/login");
// indexRouter.post("/signup");
// indexRouter.post("/:folderId/create-folder");
// indexRouter.post("/:folderId/rename-folder");
// indexRouter.post("/:folderId/delete-folder");
// indexRouter.post("/:folderId/share-folder");
// indexRouter.post("/:folderId/upload-file");
// indexRouter.post("/:fileId/rename-file");
// indexRouter.post("/:fileId/delete-file");

export default indexRouter;

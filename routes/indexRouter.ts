import { Router } from "express";
import isAuth from "../middleware/auth";
import {
  folderGet,
  loginFormGet,
  loginFormPost,
  redirectIndex,
  signupFormGet,
  signupFormPost,
} from "../controllers/indexController";
import {
  validateFileName,
  validateFolderName,
  validateLogin,
  validateSignup,
} from "../middleware/formValidation";

const indexRouter = Router();

indexRouter.get("/", isAuth, redirectIndex);
indexRouter.get("/login", loginFormGet);
indexRouter.get("/signup", signupFormGet);
indexRouter.get("/:fileId/download", isAuth);
indexRouter.get("/:folderId", isAuth, folderGet);

indexRouter.post("/login", validateLogin, loginFormPost);
indexRouter.post("/signup", validateSignup, signupFormPost);
indexRouter.post("/:folderId/create-folder", validateFolderName);
indexRouter.post("/:folderId/rename-folder", validateFolderName);
// indexRouter.post("/:folderId/delete-folder");
// indexRouter.post("/:folderId/share-folder");
// indexRouter.post("/:folderId/upload-file");
indexRouter.post("/:fileId/rename-file", validateFileName);
// indexRouter.post("/:fileId/delete-file");

export default indexRouter;

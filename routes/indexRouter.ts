import { Router } from "express";
import isAuth from "../middleware/auth";
import {
  createFolderPost,
  deleteFolderPost,
  folderGet,
  loginFormGet,
  loginFormPost,
  redirectIndex,
  renameFolderPost,
  signupFormGet,
  signupFormPost,
  uploadFile,
} from "../controllers/indexController";
import {
  validateFile,
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
indexRouter.post(
  "/:folderId/create-folder",
  validateFolderName,
  createFolderPost
);
indexRouter.post(
  "/:folderId/rename-folder",
  validateFolderName,
  renameFolderPost
);
indexRouter.post("/:folderId/delete-folder", deleteFolderPost);
// indexRouter.post("/:folderId/share-folder");
indexRouter.post("/:folderId/upload-file", uploadFile, validateFile);
indexRouter.post("/:fileId/rename-file", validateFileName);
// indexRouter.post("/:fileId/delete-file");

export default indexRouter;

import { Router } from "express";
import {
  createFolderPost,
  deleteFilePost,
  deleteFolderPost,
  downloadFileGet,
  folderGet,
  loginFormGet,
  loginFormPost,
  recordFilePost,
  redirectIndex,
  renameFilePost,
  renameFolderPost,
  shareFolderPost,
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
import { isAuthFile, isAuthFolder } from "../middleware/auth";

const indexRouter = Router();

indexRouter.get("/", redirectIndex);
indexRouter.get("/login", loginFormGet);
indexRouter.get("/signup", signupFormGet);
indexRouter.get("/:fileId/download", isAuthFile, downloadFileGet);
indexRouter.get("/:folderId", isAuthFolder, folderGet);

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
indexRouter.post("/:folderId/share-folder", shareFolderPost);
indexRouter.post(
  "/:folderId/upload-file",
  uploadFile,
  validateFile,
  recordFilePost
);
indexRouter.post("/:fileId/rename-file", validateFileName, renameFilePost);
indexRouter.post("/:fileId/delete-file", deleteFilePost);

export default indexRouter;

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
import { isAuthExtra, isAuthFile, isAuthFolder } from "../middleware/auth";

const indexRouter = Router();

indexRouter.get("/", isAuthExtra, redirectIndex);
indexRouter.get("/login", loginFormGet);
indexRouter.get("/signup", signupFormGet);
indexRouter.get("/:fileId/download", isAuthFile, downloadFileGet);
indexRouter.get("/:folderId", isAuthFolder, folderGet);

indexRouter.post("/login", validateLogin, loginFormPost);
indexRouter.post("/signup", validateSignup, signupFormPost);
indexRouter.post(
  "/:folderId/create-folder",
  isAuthExtra,
  validateFolderName,
  createFolderPost
);
indexRouter.post(
  "/:folderId/rename-folder",
  isAuthExtra,
  validateFolderName,
  renameFolderPost
);
indexRouter.post("/:folderId/delete-folder", isAuthExtra, deleteFolderPost);
indexRouter.post("/:folderId/share-folder", isAuthExtra, shareFolderPost);
indexRouter.post(
  "/:folderId/upload-file",
  isAuthExtra,
  uploadFile,
  validateFile,
  recordFilePost
);
indexRouter.post(
  "/:fileId/rename-file",
  isAuthExtra,
  validateFileName,
  renameFilePost
);
indexRouter.post("/:fileId/delete-file", isAuthExtra, deleteFilePost);

export default indexRouter;

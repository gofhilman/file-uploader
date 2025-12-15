const renameFolderButton = document.querySelector("#rename-folder-button");
const deleteFolderButton = document.querySelector("#delete-folder-button");
const createFolderButton = document.querySelector("#create-folder-button");
const shareStatusButton = document.querySelector("#share-status-button");
const uploadFileButton = document.querySelector("#upload-file-button");
const renameFileButton = Array.from(
  document.querySelectorAll(".rename-file-button")
);
const deleteFileButton = Array.from(
  document.querySelectorAll(".delete-file-button")
);
const renameFolder = document.querySelector("#rename-folder");
const deleteFolder = document.querySelector("#delete-folder");
const createFolder = document.querySelector("#create-folder");
const shareStatus = document.querySelector("#share-status");
const uploadFile = document.querySelector("#upload-file");
const renameFile = Array.from(document.querySelectorAll(".rename-file"));
const deleteFile = Array.from(document.querySelectorAll(".delete-file"));
const errorRenameFolder = document.querySelector("#error-rename-folder");
const errorCreateFolder = document.querySelector("#error-create-folder");
const errorUploadFile = document.querySelector("#error-upload-file");
const errorRenameFile = Array.from(
  document.querySelectorAll(".error-rename-file")
);

const dialogs = [
  [renameFolderButton, renameFolder, errorRenameFolder],
  [deleteFolderButton, deleteFolder],
  [createFolderButton, createFolder, errorCreateFolder],
  [shareStatusButton, shareStatus],
  [uploadFileButton, uploadFile, errorUploadFile],
];

for (let i = 0; i < renameFile.length; i++) {
  dialogs.push([renameFileButton[i], renameFile[i], errorRenameFile[i]]);
  dialogs.push([deleteFileButton[i], deleteFile[i]]);
}

dialogs.forEach((dialog) => {
  if (dialog[0]) {
    dialog[0].addEventListener("click", () => dialog[1].showModal());
  }
  if (dialog.length === 3 && dialog[2]) {
    dialog[0].addEventListener("click", () => dialog[2].showModal());
    dialog[2].showModal();
  }
});

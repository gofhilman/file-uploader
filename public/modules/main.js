const renameFolderButton = document.querySelector("#rename-folder-button");
const deleteFolderButton = document.querySelector("#delete-folder-button");
const createFolderButton = document.querySelector("#create-folder-button");
const shareStatusButton = document.querySelector("#share-status-button");
const renameFolder = document.querySelector("#rename-folder");
const deleteFolder = document.querySelector("#delete-folder");
const createFolder = document.querySelector("#create-folder");
const shareStatus = document.querySelector("#share-status");
const errorRenameFolder = document.querySelector("#error-rename-folder");
const errorCreateFolder = document.querySelector("#error-create-folder");

const dialogs = [
  [renameFolderButton, renameFolder, errorRenameFolder],
  [deleteFolderButton, deleteFolder],
  [createFolderButton, createFolder, errorCreateFolder],
  [shareStatusButton, shareStatus],
];

dialogs.forEach((dialog) => {
  if (dialog[0]) {
    dialog[0].addEventListener("click", () => dialog[1].showModal());
  }
  if (dialog.length === 3 && dialog[2]) {
    dialog[0].addEventListener("click", () => dialog[2].showModal());
    dialog[2].showModal();
  }
});

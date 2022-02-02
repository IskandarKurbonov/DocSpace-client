import React from "react";
import { StyledAsidePanel, StyledSelectFilePanel } from "../StyledPanels";
import ModalDialog from "@appserver/components/modal-dialog";
import SelectFolderDialog from "../SelectFolderDialog";
import FolderTreeBody from "../../FolderTreeBody";
import FilesListBody from "./FilesListBody";
import Button from "@appserver/components/button";
import Text from "@appserver/components/text";
import { isArrayEqual } from "@appserver/components/utils/array";
import { getFoldersTree } from "@appserver/common/api/files";
import {
  exceptSortedByTagsFolders,
  exceptPrivacyTrashFolders,
} from "../SelectFolderDialog/ExceptionFoldersConstants";

class SelectFileDialogModalView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      isAvailable: true,
    };
    this.folderList = "";
    this.noTreeSwitcher = false;
  }

  componentDidMount() {
    const { onSetLoadingData } = this.props;
    this.setState({ isLoadingData: true }, function () {
      onSetLoadingData && onSetLoadingData(true);

      this.trySwitch();
    });
  }
  trySwitch = async () => {
    const {
      foldersType,
      onSelectFolder,
      selectedFolder,
      passedId,
    } = this.props;
    switch (foldersType) {
      case "exceptSortedByTags":
        try {
          const foldersTree = await getFoldersTree();
          [
            this.folderList,
            this.noTreeSwitcher,
          ] = SelectFolderDialog.convertFolders(
            foldersTree,
            exceptSortedByTagsFolders
          );
          this.onSetSelectedFolder();
        } catch (err) {
          console.error(err);
        }

        this.loadersCompletes();
        break;
      case "exceptPrivacyTrashFolders":
        try {
          const foldersTree = await getFoldersTree();
          [
            this.folderList,
            this.noTreeSwitcher,
          ] = SelectFolderDialog.convertFolders(
            foldersTree,
            exceptPrivacyTrashFolders
          );
          this.onSetSelectedFolder();
        } catch (err) {
          console.error(err);
        }
        this.loadersCompletes();
        break;
      case "common":
        try {
          this.folderList = await SelectFolderDialog.getCommonFolders();

          !selectedFolder &&
            onSelectFolder &&
            onSelectFolder(
              `${
                selectedFolder
                  ? selectedFolder
                  : passedId
                  ? passedId
                  : this.folderList[0].id
              }`
            );
        } catch (err) {
          console.error(err);
        }

        this.loadersCompletes();
        break;
      case "third-party":
        try {
          this.folderList = await SelectFolderDialog.getCommonThirdPartyList();
          this.folderList.length !== 0
            ? this.onSetSelectedFolder()
            : this.setState({ isAvailable: false });
        } catch (err) {
          console.error(err);
        }

        this.loadersCompletes();
        break;
    }
  };

  loadersCompletes = () => {
    const { onSetLoadingData } = this.props;
    onSetLoadingData && onSetLoadingData(false);

    this.setState({
      isLoading: false,
    });
  };

  onSetSelectedFolder = () => {
    const { onSelectFolder, selectedFolder, passedId } = this.props;

    onSelectFolder &&
      onSelectFolder(
        `${
          selectedFolder
            ? selectedFolder
            : passedId
            ? passedId
            : this.folderList[0].id
        }`
      );
  };
  onSelect = (folder) => {
    const { onSelectFolder, selectedFolder } = this.props;

    if (isArrayEqual([folder[0]], [selectedFolder])) {
      return;
    }

    onSelectFolder && onSelectFolder(folder[0]);
  };
  render() {
    const {
      t,
      isPanelVisible,
      onClose,
      zIndex,
      withoutProvider,
      expandedKeys,
      filter,
      onSelectFile,
      filesList,
      hasNextPage,
      isNextPageLoading,
      loadNextPage,
      selectedFolder,
      titleFilesList,
      loadingText,
      selectedFile,
      onClickSave,
      headerName,
      primaryButtonName,
    } = this.props;

    const { isLoading, isAvailable } = this.state;

    const isHeaderChildren = !!titleFilesList;

    return (
      <StyledAsidePanel visible={isPanelVisible}>
        <ModalDialog
          visible={isPanelVisible}
          zIndex={zIndex}
          onClose={onClose}
          className="select-file-modal-dialog"
          style={{ maxWidth: "725px" }}
          displayType="modal"
          modalBodyPadding="0px"
          isLoading={isLoading}
          modalLoaderBodyHeight="277px"
        >
          <ModalDialog.Header>
            {headerName ? headerName : t("SelectFile")}
          </ModalDialog.Header>
          <ModalDialog.Body className="select-file_body-modal-dialog">
            <StyledSelectFilePanel
              isHeaderChildren={isHeaderChildren}
              displayType="modal"
              noTreeSwitcher={this.noTreeSwitcher}
            >
              <div className="modal-dialog_body">
                <div className="modal-dialog_tree-body">
                  <FolderTreeBody
                    expandedKeys={expandedKeys}
                    folderList={this.folderList}
                    onSelect={this.onSelect}
                    withoutProvider={withoutProvider}
                    certainFolders
                    isAvailable={isAvailable}
                    filter={filter}
                    selectedKeys={[selectedFolder]}
                    isHeaderChildren={isHeaderChildren}
                    displayType="modal"
                  />
                </div>
                <div className="modal-dialog_files-body">
                  <>
                    {titleFilesList && (
                      <Text className="modal-dialog-filter-title">
                        {titleFilesList}
                      </Text>
                    )}
                    {selectedFolder && (
                      <FilesListBody
                        filesList={filesList}
                        onSelectFile={onSelectFile}
                        hasNextPage={hasNextPage}
                        isNextPageLoading={isNextPageLoading}
                        loadNextPage={loadNextPage}
                        selectedFolder={selectedFolder}
                        loadingText={loadingText}
                        selectedFile={selectedFile}
                        listHeight={isHeaderChildren ? 260 : 303}
                        onSetLoadingData={this.onSetLoadingData}
                        displayType={"modal"}
                      />
                    )}
                  </>
                </div>
              </div>
            </StyledSelectFilePanel>
          </ModalDialog.Body>
          <ModalDialog.Footer>
            <StyledSelectFilePanel isHeaderChildren={isHeaderChildren}>
              <div className="select-file-dialog-modal_buttons">
                <Button
                  className="select-file-modal-dialog-buttons-save"
                  primary
                  size="medium"
                  label={primaryButtonName}
                  onClick={onClickSave}
                  isDisabled={selectedFile.length === 0}
                />
                <Button
                  className="modal-dialog-button"
                  size="medium"
                  label={t("Common:CancelButton")}
                  onClick={onClose}
                />
              </div>
            </StyledSelectFilePanel>
          </ModalDialog.Footer>
        </ModalDialog>
      </StyledAsidePanel>
    );
  }
}

export default SelectFileDialogModalView;

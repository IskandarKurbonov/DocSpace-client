import React, { useEffect, useMemo } from "react";
import { inject, observer } from "mobx-react";
import RowContainer from "@docspace/components/row-container";
import SimpleFilesRow from "./SimpleFilesRow";

import styled, { css } from "styled-components";
import marginStyles from "./CommonStyles";
import { isTablet } from "@docspace/components/utils/device";
import { Base } from "@docspace/components/themes";
import { DeviceType } from "@docspace/common/constants";

const StyledRowContainer = styled(RowContainer)`
  .row-list-item:first-child {
    .row-selected {
      .files-row {
        border-top: ${(props) =>
          `1px ${props.theme.filesSection.tableView.row.borderColor} solid`};
        margin-top: -1px;
        padding-top: 0px;
        padding-bottom: 1px;
        ${marginStyles};
      }
    }
  }
  .row-selected + .row-wrapper:not(.row-selected) {
    .files-row {
      border-top: ${(props) =>
        `1px ${props.theme.filesSection.tableView.row.borderColor} solid`};
      margin-top: -3px;
      ${marginStyles}
    }
  }

  .row-wrapper:not(.row-selected)
    //+ .row-wrapper:not(.row-hotkey-border)
    + .row-selected {
    .files-row {
      border-top: ${(props) =>
        `1px ${props.theme.filesSection.tableView.row.borderColor} solid`};
      margin-top: -3px;
      ${marginStyles}
    }
  }

  .row-hotkey-border + .row-selected {
    .files-row {
      border-top: 1px solid #2da7db !important;
    }
  }

  .row-selected:last-child {
    .files-row {
      border-bottom: ${(props) =>
        `1px ${props.theme.filesSection.tableView.row.borderColor} solid`};
      ${marginStyles}
    }
    .files-row::after {
      height: 0px;
    }
  }
  .row-selected:first-child {
    .files-row {
      border-top: ${(props) =>
        `1px ${props.theme.filesSection.tableView.row.borderColor} solid`};
      margin-top: -2px;
      padding-top: 1px;
      padding-bottom: 1px;
      ${marginStyles};
    }
  }
`;

StyledRowContainer.defaultProps = { theme: Base };

const FilesRowContainer = ({
  filesList,
  sectionWidth,
  viewAs,
  idx,
  setViewAs,
  infoPanelVisible,
  filterTotal,
  fetchMoreFiles,
  hasMoreFiles,
  isRooms,
  isTrashFolder,
  withPaging,
  highlightFile,
  currentDeviceType,
}) => {
  useEffect(() => {
    const width = window.innerWidth;

    if ((viewAs !== "table" && viewAs !== "row") || !sectionWidth) return;
    // 400 - it is desktop info panel width
    if (
      (width < 1025 && !infoPanelVisible) ||
      ((width < 625 || (viewAs === "row" && width < 1025)) &&
        infoPanelVisible) ||
      currentDeviceType !== DeviceType.desktop
    ) {
      viewAs !== "row" && setViewAs("row");
    } else {
      viewAs !== "table" && setViewAs("table");
    }
  }, [sectionWidth, currentDeviceType]);

  const filesListNode = useMemo(() => {
    return filesList.map((item, index) => (
      <SimpleFilesRow
        id={`${item?.isFolder ? "folder" : "file"}_${item.id}`}
        key={
          item?.version ? `${item.id}_${item.version}` : `${item.id}_${index}`
        }
        item={item}
        idx={idx}
        itemIndex={index}
        sectionWidth={sectionWidth}
        isRooms={isRooms}
        isTrashFolder={isTrashFolder}
        isHighlight={
          highlightFile.id == item.id && highlightFile.isExst === !item.fileExst
        }
      />
    ));
  }, [
    filesList,
    sectionWidth,
    isRooms,
    highlightFile.id,
    highlightFile.isExst,
    isTrashFolder,
  ]);
  return (
    <StyledRowContainer
      className="files-row-container"
      filesLength={filesList.length}
      itemCount={filterTotal}
      fetchMoreFiles={fetchMoreFiles}
      hasMoreFiles={hasMoreFiles}
      draggable
      useReactWindow={!withPaging}
      itemHeight={59}>
      {filesListNode}
    </StyledRowContainer>
  );
};

export default inject(({ filesStore, auth, treeFoldersStore }) => {
  const {
    filesList,
    viewAs,
    setViewAs,
    filterTotal,
    fetchMoreFiles,
    hasMoreFiles,
    roomsFilterTotal,
    highlightFile,
  } = filesStore;
  const { isVisible: infoPanelVisible } = auth.infoPanelStore;
  const { isRoomsFolder, isArchiveFolder, isTrashFolder } = treeFoldersStore;
  const { withPaging, currentDeviceType } = auth.settingsStore;

  const isRooms = isRoomsFolder || isArchiveFolder;

  return {
    filesList,
    viewAs,
    setViewAs,
    infoPanelVisible,
    filterTotal: isRooms ? roomsFilterTotal : filterTotal,
    fetchMoreFiles,
    hasMoreFiles,
    isRooms,
    isTrashFolder,
    withPaging,
    highlightFile,
    currentDeviceType,
  };
})(observer(FilesRowContainer));

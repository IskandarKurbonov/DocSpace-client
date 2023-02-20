import { getCustomToolbar } from "../../helpers/getCustomToolbar";
import { ContextMenuModel, PlaylistType } from "../../types";

interface ViewerProps {
  title: string;
  images: { src: string; alt: string }[];
  isAudio: boolean;
  isVideo: boolean;
  visible: boolean;
  isImage: boolean;

  playlist: PlaylistType[];
  inactive: boolean;

  audioIcon: string;
  zoomSpeed: number;
  errorTitle: string;
  headerIcon: string;
  customToolbar: () => ReturnType<typeof getCustomToolbar>;
  playlistPos: number;
  archiveRoom: boolean;
  isPreviewFile: boolean;
  onMaskClick: VoidFunction;
  onNextClick: VoidFunction;
  onPrevClick: VoidFunction;
  contextModel: () => ContextMenuModel[];
  onDownloadClick: VoidFunction;
  generateContextMenu: (
    isOpen: boolean,
    right: string,
    bottom: string
  ) => JSX.Element;
  onSetSelectionFile: VoidFunction;
}

export default ViewerProps;
import React from "react";
import styled, { css } from "styled-components";
import MainButtonMobile from ".";
import { useEffect, useReducer, useState } from "react";
// @ts-expect-error TS(2307): Cannot find module 'PUBLIC_DIR/images/mobile.actio... Remove this comment to see the full error message
import MobileActionsFolderReactSvgUrl from "PUBLIC_DIR/images/mobile.actions.folder.react.svg?url";
// @ts-expect-error TS(2307): Cannot find module 'PUBLIC_DIR/images/mobile.actio... Remove this comment to see the full error message
import MobileActionsRemoveReactSvgUrl from "PUBLIC_DIR/images/mobile.actions.remove.react.svg?url";
// @ts-expect-error TS(2307): Cannot find module 'PUBLIC_DIR/images/mobile.star.... Remove this comment to see the full error message
import MobileStartReactSvgUrl from "PUBLIC_DIR/images/mobile.star.react.svg?url";
import { useTheme } from "styled-components";
// @ts-expect-error TS(2307): Cannot find module './main-button-mobile-docs.mdx'... Remove this comment to see the full error message
import MobileMainButtonDocs from "./main-button-mobile-docs.mdx";

export default {
  title: "Components/MainButtonMobile",
  component: MainButtonMobile,
  tags: ["autodocs"],
  parameters: {
    docs: {
      page: MobileMainButtonDocs,
    },
  },
};

const actionOptions = [
  {
    key: "1",
    label: "New document",
    icon: MobileActionsFolderReactSvgUrl,
  },
  {
    key: "2",
    label: "New presentation",
    icon: MobileActionsFolderReactSvgUrl,
  },
  {
    key: "3",
    label: "New spreadsheet",
    icon: MobileActionsFolderReactSvgUrl,
  },
  {
    key: "4",
    label: "New folder",
    icon: MobileActionsFolderReactSvgUrl,
  },
];

const buttonOptions = [
  {
    key: "1",
    label: "Import point",
    icon: MobileStartReactSvgUrl,
    // @ts-expect-error TS(2304): Cannot find name 'setIsOpenButton'.
    onClick: () => setIsOpenButton(false),
  },
  {
    key: "2",
    label: "Import point",
    icon: MobileStartReactSvgUrl,
    // @ts-expect-error TS(2304): Cannot find name 'setIsOpenButton'.
    onClick: () => setIsOpenButton(false),
  },
  {
    key: "3",
    label: "Import point",
    isSeparator: true,
  },
  {
    key: "4",
    label: "Import point",
    icon: MobileStartReactSvgUrl,
    // @ts-expect-error TS(2304): Cannot find name 'setIsOpenButton'.
    onClick: () => setIsOpenButton(false),
  },
];

const StyledWrapper = styled.div`
  width: 500px;
  height: 600px;

  ${(props) =>
    // @ts-expect-error TS(2339): Property 'isAutoDocs' does not exist on type 'Them... Remove this comment to see the full error message
    props.isAutoDocs &&
    css`
      width: calc(100% + 40px);
      height: 500px;
      position: relative;
      margin: 0 0 -20px -20px;
    `}

  ${(props) =>
    // @ts-expect-error TS(2339): Property 'isMobile' does not exist on type 'Themed... Remove this comment to see the full error message
    props.isMobile &&
    css`
      .mainBtnDropdown {
        right: 5px !important;
        bottom: 5px !important;
      }
    `}
`;

const Template = ({ ...args }) => {
  const maxUploads = 10;
  const maxOperations = 7;

  const [isOpenUploads, setIsOpenUploads] = useState(false);
  const [isOpenOperations, setIsOpenOperations] = useState(false);

  const [isOpenButton, setIsOpenButton] = useState(false);
  const [opened, setOpened] = useState(null);

  const [isUploading, setIsUploading] = useState(false);

  const [initialState, setInitialState] = useState({
    uploads: 0,
    operations: 0,
  });
  const onUploadClick = () => {
    setInitialState({ uploads: 0, operations: 0 });
    setIsUploading(true);
    setIsOpenUploads(true);
    setIsOpenOperations(true);
    setIsOpenButton(true);
    //  setOpened(false);
  };

  function reducer(state: any, action: any) {
    switch (action.type) {
      case "start":
        if (
          state.uploads === maxUploads &&
          state.operations === maxOperations
        ) {
          setIsUploading(false);
          return {
            ...state,
            uploads: state.uploads,
            operations: state.operations,
          };
        }
        return {
          ...state,
          uploads:
            state.uploads !== maxUploads ? state.uploads + 1 : state.uploads,
          operations:
            state.operations !== maxOperations
              ? state.operations + 1
              : state.operations,
        };
      default:
        return state;
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    setOpened(null);
    if (isUploading) {
      const id = setInterval(() => {
        dispatch({ type: "start" });
      }, 1000);

      return () => clearInterval(id);
    }
  }, [dispatch, isUploading]);

  const uploadPercent = (state.uploads / maxUploads) * 100;
  const operationPercent = (state.operations / maxOperations) * 100;

  const progressOptions = [
    {
      key: "1",
      label: "Uploads",
      icon: MobileActionsRemoveReactSvgUrl,
      percent: uploadPercent,
      status: `${state.uploads}/${maxUploads}`,
      open: isOpenUploads,
      onCancel: () => setIsOpenUploads(false),
    },
    {
      key: "2",
      label: "Other operations",
      icon: MobileActionsRemoveReactSvgUrl,
      percent: operationPercent,
      status: `3 files not loaded`,
      open: isOpenOperations,
      onCancel: () => setIsOpenOperations(false),
      error: true,
    },
  ];

  const [isMobile, setIsMobile] = useState(window.innerWidth < 1245);

  useEffect(() => {
    const handleResize = () => {
      // @ts-expect-error TS(2367): This condition will always return 'true' since the... Remove this comment to see the full error message
      isMobile !== window.innerWidth && setIsMobile(window.innerWidth < 1025);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const isAutoDocs =
    typeof window !== "undefined" && window?.location?.href.includes("docs");
  // @ts-expect-error TS(2339): Property 'interfaceDirection' does not exist on ty... Remove this comment to see the full error message
  const { interfaceDirection } = useTheme();
  const style = {
    position: "absolute",
    bottom: "26px",
    [interfaceDirection === "rtl" ? "left" : "right"]: "44px",
  };
  const dropdownStyle = {
    position: "absolute",
    [interfaceDirection === "rtl" ? "left" : "right"]: "60px",
    bottom: "25px",
  };
  return (
    // @ts-expect-error TS(2769): No overload matches this call.
    <StyledWrapper isAutoDocs={isAutoDocs} isMobile={isMobile}>
      <MainButtonMobile
        {...args}
        style={style}
        actionOptions={actionOptions}
        // @ts-expect-error TS(2322): Type '{ style: { [x: string]: string; position: st... Remove this comment to see the full error message
        dropdownStyle={dropdownStyle}
        progressOptions={progressOptions}
        buttonOptions={buttonOptions}
        onUploadClick={onUploadClick}
        withButton={true}
        isOpenButton={isOpenButton}
        isDefaultMode={false}
        title="Upload"
        percent={uploadPercent}
        opened={opened}
      />
    </StyledWrapper>
  );
};

export const Default = Template.bind({});
// @ts-expect-error TS(2339): Property 'args' does not exist on type '({ ...args... Remove this comment to see the full error message
Default.args = {
  title: "Upload",
  percent: 0,
  opened: null,
};

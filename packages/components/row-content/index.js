import React from "react";
import PropTypes from "prop-types";

import {
  TabletSideInfo,
  SideContainerWrapper,
  MainContainer,
  MainIcons,
  MainContainerWrapper,
  StyledRowContent,
} from "./styled-row-content";
import { useTheme } from "styled-components";

const getSideInfo = (content, convert, interfaceDirection = "ltr", id, idx) => {
  let info = [];
  let child = null;
  const lastIndex = content.length - 1;

  content.map((element, index) => {
    if (index > 1) {
      if (!convert && index === lastIndex) {
        child = element;
      } else {
        element.props &&
          element.props.children &&
          info.push(element.props.children);
      }
    }
  });

  if (interfaceDirection === "rtl") {
    info.reverse();
  }

  return interfaceDirection === "ltr" ? (
    <>
      {idx && `idx ${id || Math.random()} | `}
      {info.join(" | ")}
      {child}
    </>
  ) : (
    <>
      {child}
      {info.join(" | ")}
    </>
  );
};

const RowContent = (props) => {
  const {
    children,
    disableSideInfo,
    id,
    idx,
    className,
    style,
    sideColor,
    onClick,
    sectionWidth,
    convertSideInfo,
  } = props;
  const { interfaceDirection } = useTheme();
  const sideInfo = getSideInfo(
    children,
    convertSideInfo,
    interfaceDirection,
    id,
    idx
  );
  const mainContainerWidth =
    children[0].props && children[0].props.containerWidth;

  return (
    <StyledRowContent
      className={className}
      disableSideInfo={disableSideInfo}
      id={id}
      onClick={onClick}
      style={style}
      widthProp={sectionWidth}
      isMobile={true}
    >
      <MainContainerWrapper
        disableSideInfo={disableSideInfo}
        mainContainerWidth={mainContainerWidth}
        widthProp={sectionWidth}
        isMobile={true}
        className="row-main-container-wrapper"
      >
        <MainContainer
          className="rowMainContainer"
          widthProp={sectionWidth}
          isMobile={true}
        >
          {children[0]}
        </MainContainer>
        <MainIcons className="mainIcons">{children[1]}</MainIcons>
      </MainContainerWrapper>
      {children.map((element, index) => {
        if (index > 1) {
          return (
            <SideContainerWrapper
              disableSideInfo={disableSideInfo}
              key={"side-" + index}
              containerWidth={element.props && element.props.containerWidth}
              containerMinWidth={
                element.props && element.props.containerMinWidth
              }
              widthProp={sectionWidth}
              isMobile={true}
            >
              {element}
            </SideContainerWrapper>
          );
        }
      })}
      {!disableSideInfo && (
        <TabletSideInfo
          className="row-content_tablet-side-info"
          color={sideColor}
          widthProp={sectionWidth}
          isMobile={true}
          convertSideInfo={convertSideInfo}
        >
          {sideInfo}
        </TabletSideInfo>
      )}
    </StyledRowContent>
  );
};

RowContent.propTypes = {
  /** Components displayed inside RowContent */
  children: PropTypes.node.isRequired,
  /** Accepts class */
  className: PropTypes.string,
  /** Disables SideElements */
  disableSideInfo: PropTypes.bool,
  /** Accepts id */
  id: PropTypes.string,
  /** Sets the action initiated upon clicking the button */
  onClick: PropTypes.func,
  /** Changes the side information color */
  sideColor: PropTypes.string,
  /** Accepts css style */
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  /** Width section */
  sectionWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** Converts the SideInfo */
  convertSideInfo: PropTypes.bool,
};

RowContent.defaultProps = {
  disableSideInfo: false,
  convertSideInfo: true,
};

export default RowContent;

import React from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";

import Text from "@docspace/components/text";

import DefaultIcon from "PUBLIC_DIR/images/default.react.svg";
import RootIcon from "PUBLIC_DIR/images/root.react.svg";
import DefaultTabletIcon from "PUBLIC_DIR/images/default.tablet.react.svg";
import RootTabletIcon from "PUBLIC_DIR/images/root.tablet.react.svg";

import { isMobile } from "react-device-detect";
import {
  tablet,
  isTablet,
  isMobile as IsMobileUtils,
  mobile,
} from "@docspace/components/utils/device";
import { Base } from "@docspace/components/themes";

import { ColorTheme, ThemeType } from "@docspace/components/ColorTheme";

const StyledItem = styled.div`
  height: auto;
  width: auto !important;
  position: relative;
  display: grid;
  align-items: ${(props) => (props.isRoot ? "baseline" : "end")};
  grid-template-columns: 17px auto;
  cursor: pointer;

  ${({ theme }) =>
    theme.interfaceDirection === "rtl" ? `margin-right: 0;` : `margin-left: 0;`}

  @media ${tablet} {
    ${({ withLogo }) =>
      withLogo &&
      css`
        ${(props) =>
          props.theme.interfaceDirection === "rtl"
            ? css`
                margin-right: 44px;
              `
            : css`
                margin-left: 44px;
              `}
      `};
  }

  ${isMobile &&
  css`
    ${(props) =>
      props.theme.interfaceDirection === "rtl"
        ? css`
            margin-right: 0;
          `
        : css`
            margin-left: 0;
          `}
  `};

  @media ${mobile} {
    ${(props) =>
      props.theme.interfaceDirection === "rtl"
        ? css`
            margin-right: 0;
          `
        : css`
            margin-left: 0;
          `}
  }
`;

const StyledText = styled(Text)`
  ${(props) =>
    props.theme.interfaceDirection === "rtl"
      ? css`
          margin-right: 10px;
        `
      : css`
          margin-left: 10px;
        `}
  position: relative;
  bottom: ${(props) => (props.isRoot ? "2px" : "-1px")};
`;

const Item = ({
  id,
  title,
  isRoot,
  isRootRoom,
  onClick,
  withLogo,
  ...rest
}) => {
  const onClickAvailable = () => {
    onClick && onClick(id, isRootRoom);
  };

  return (
    <StyledItem
      id={id}
      isRoot={isRoot}
      onClick={onClickAvailable}
      withLogo={withLogo}
      {...rest}
    >
      <ColorTheme isRoot={isRoot} themeId={ThemeType.IconWrapper}>
        {isMobile || isTablet() || IsMobileUtils() ? (
          isRoot ? (
            <RootTabletIcon />
          ) : (
            <DefaultTabletIcon />
          )
        ) : isRoot ? (
          <RootIcon />
        ) : (
          <DefaultIcon />
        )}
      </ColorTheme>

      <StyledText
        isRoot={isRoot}
        fontWeight={isRoot ? "600" : "400"}
        fontSize={"15px"}
        truncate={true}
        title={title}
      >
        {title}
      </StyledText>
    </StyledItem>
  );
};

Item.propTypes = {
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  title: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  isRoot: PropTypes.bool,
  onClick: PropTypes.func,
};

export default React.memo(Item);

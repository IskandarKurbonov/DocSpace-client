import styled, { css } from "styled-components";
import Base from "../themes/base";

const StyledViewSelector = styled.div`
  height: 32px;
  width: ${(props) =>
    // @ts-expect-error TS(2339): Property 'isFilter' does not exist on type 'Themed... Remove this comment to see the full error message
    props.isFilter ? `32px` : `calc(${props.countItems} * 32px)`};
  position: relative;
  box-sizing: border-box;
  display: flex;

  ${(props) =>
    // @ts-expect-error TS(2339): Property 'isFilter' does not exist on type 'Themed... Remove this comment to see the full error message
    props.isFilter
      ? css``
      // @ts-expect-error TS(2339): Property 'countItems' does not exist on type 'Them... Remove this comment to see the full error message
      : props.countItems > 2
      ? css`
          .view-selector-icon:hover {
            z-index: 2;
          }
          .view-selector-icon:not(:first-child) {
            ${props.theme.interfaceDirection === "rtl"
              ? `margin-right: -1px;`
              : `margin-left: -1px;`}
          }
        `
      : css`
          .view-selector-icon:first-child {
            ${props.theme.interfaceDirection === "rtl"
              ? `border-left: none;`
              : `border-right: none;`}
          }
          .view-selector-icon:last-child {
            ${props.theme.interfaceDirection === "rtl"
              ? `border-right: none;`
              : `border-left: none;`}
          }
        `}
`;

const firstItemStyle = css`
  ${(props) =>
    props.theme.interfaceDirection === "rtl"
      ? css`
          border-top-right-radius: 3px;
          border-bottom-right-radius: 3px;
        `
      : css`
          border-top-left-radius: 3px;
          border-bottom-left-radius: 3px;
        `}
`;

const lastItemStyle = css`
  ${(props) =>
    props.theme.interfaceDirection === "rtl"
      ? css`
          border-top-left-radius: 3px;
          border-bottom-left-radius: 3px;
        `
      : css`
          border-top-right-radius: 3px;
          border-bottom-right-radius: 3px;
        `}
`;

const IconWrapper = styled.div`
  position: relative;
  padding: 7px;
  box-sizing: border-box;
  border: 1px solid;

  // @ts-expect-error TS(2339): Property 'isChecked' does not exist on type 'Theme... Remove this comment to see the full error message
  ${(props) => props.isChecked && `z-index: 1;`}

  border-color: ${(props) =>
    // @ts-expect-error TS(2339): Property 'isDisabled' does not exist on type 'Them... Remove this comment to see the full error message
    props.isDisabled
      ? props.theme.viewSelector.disabledFillColor
      // @ts-expect-error TS(2339): Property 'isChecked' does not exist on type 'Theme... Remove this comment to see the full error message
      : props.isChecked
      ? props.theme.viewSelector.checkedFillColor
      : props.theme.viewSelector.borderColor};

  ${(props) =>
    // @ts-expect-error TS(2339): Property 'isFilter' does not exist on type 'Themed... Remove this comment to see the full error message
    props.isFilter &&
    css`
      border-radius: 3px;
    `}
  // @ts-expect-error TS(2339): Property 'firstItem' does not exist on type 'Theme... Remove this comment to see the full error message
  ${(props) => props.firstItem && firstItemStyle}
  // @ts-expect-error TS(2339): Property 'lastItem' does not exist on type 'Themed... Remove this comment to see the full error message
  ${(props) => props.lastItem && lastItemStyle}

  background-color: ${(props) =>
    // @ts-expect-error TS(2339): Property 'isChecked' does not exist on type 'Theme... Remove this comment to see the full error message
    props.isChecked
      // @ts-expect-error TS(2339): Property 'isDisabled' does not exist on type 'Them... Remove this comment to see the full error message
      ? props.isDisabled
        ? props.theme.viewSelector.disabledFillColor
        : props.theme.viewSelector.checkedFillColor
      // @ts-expect-error TS(2339): Property 'isDisabled' does not exist on type 'Them... Remove this comment to see the full error message
      : props.isDisabled
      ? props.theme.viewSelector.fillColorDisabled
      : props.theme.viewSelector.fillColor};

  &:hover {
    ${(props) =>
      // @ts-expect-error TS(2339): Property 'isDisabled' does not exist on type 'Them... Remove this comment to see the full error message
      props.isDisabled || props.isChecked
        ? css`
            cursor: default;
          `
        : css`
            cursor: pointer;
            border: 1px solid
              ${(props) => props.theme.viewSelector.hoverBorderColor};
          `}
    svg {
      path {
        fill: ${(props) => props.theme.iconButton.hoverColor};
      }
    }
  }

  & > div {
    width: 16px;
    height: 16px;
  }

  svg {
    width: 16px;
    height: 16px;

    ${(props) =>
      // @ts-expect-error TS(2339): Property 'isDisabled' does not exist on type 'Them... Remove this comment to see the full error message
      !props.isDisabled
        // @ts-expect-error TS(2339): Property 'isChecked' does not exist on type 'Theme... Remove this comment to see the full error message
        ? !props.isChecked
          ? css`
              path {
                fill: ${(props) => props.theme.viewSelector.checkedFillColor};
              }
            `
          : css`
              path {
                fill: ${(props) => props.theme.viewSelector.fillColor};
              }
            `
        : css`
            path {
              fill: ${(props) =>
                props.theme.viewSelector.disabledFillColorInner};
            }
          `};
  }
`;

IconWrapper.defaultProps = { theme: Base };

StyledViewSelector.defaultProps = { theme: Base };

export { StyledViewSelector, IconWrapper };

import styled, { css } from "styled-components";

import DropDown from "@docspace/components/drop-down";
import DropDownItem from "@docspace/components/drop-down-item";
import ComboButton from "@docspace/components/combobox/sub-components/combo-button";
import { Base } from "@docspace/components/themes";

export const CategoryFilterMobileWrapper = styled.div`
  width: 100%;
  position: relative;

  .combo-button-label {
    font-weight: 400;
    font-size: 13px;
    line-height: 20px;
  }
`;

export const CategoryFilterMobile = styled(DropDown)`
  position: absolute;
  top: 36px;
  left: 0;
  width: 100%;

  padding: 6px 0;
  height: ${({ forcedHeight }) => forcedHeight};

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  .section-scroll,
  .scroll-body {
    ${({ theme }) =>
      theme.interfaceDirection === "rtl"
        ? `padding-left: 0px !important;`
        : `padding-right: 0px !important;`}
  }
`;

export const CategoryFilterItemMobile = styled(DropDownItem)`
  width: 100%;
  height: 36px;
  box-sizing: border-box;

  font-size: 13px;
  font-weight: 600;
  line-height: 20px;

  padding-top: 8px;
  padding-bottom: 8px;

  .submenu-arrow {
    margin: ${({ theme }) =>
      theme.interfaceDirection !== "rtl" ? `0 0 0 auto` : `0 auto 0 0`};

    svg {
      height: 12px;
      width: 12px;
    }

    ${({ isMobileOpen }) =>
      isMobileOpen &&
      css`
        transform: rotate(270deg);
      `}
  }
`;

CategoryFilterItemMobile.defaultProps = { theme: Base };

export const StyledSubItemMobile = styled(DropDownItem)`
  padding-left: 28px;
`;

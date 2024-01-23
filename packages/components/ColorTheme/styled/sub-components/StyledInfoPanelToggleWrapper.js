import styled from "styled-components";
import Base from "../../../themes/base";
import { tablet } from "../../../utils/device";

const StyledInfoPanelToggleWrapper = styled.div`
  display: flex;

  @media ${tablet} {
    display: none;
  }

  align-items: center;
  justify-content: center;

  ${({ theme }) =>
    theme.interfaceDirection === "rtl"
      ? `padding-left: 20px;`
      : `padding-right: 20px;`}

  .info-panel-toggle-bg {
    height: 32px;
    width: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background-color: ${(props) =>
      !props.isInfoPanelVisible
        ? "none"
        : props.theme.infoPanel.sectionHeaderToggleBgActive};

    path {
      fill: ${(props) => props.theme.infoPanel.sectionHeaderToggleIconActive};
    }
  }
`;

StyledInfoPanelToggleWrapper.defaultProps = { theme: Base };

export default StyledInfoPanelToggleWrapper;

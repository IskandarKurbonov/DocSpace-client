import styled, { css } from "styled-components";
import { mobile } from "@docspace/components/utils/device";

const StyledSectionBodyContent = styled.div`
  .notification-container {
    display: grid;
    max-width: 660px;
    grid-template-columns: 1fr 124px;
    margin-bottom: 21px;

    .toggle-btn {
      ${props =>
        props.theme.interfaceDirection === "rtl"
          ? css`
              padding-right: 44px;
            `
          : css`
              padding-left: 44px;
            `}
    }
    .notification-container_description {
      color: ${props => props.theme.profile.notifications.textDescriptionColor};
    }
  }
  .badges-container {
    margin-bottom: 40px;

    @media ${mobile} {
      margin-bottom: 29px;
    }
  }
`;

const StyledTextContent = styled.div`
  margin-bottom: 23px;
  height: 40px;
  border-bottom: ${props => props.theme.filesPanels.sharing.borderBottom};
  max-width: 700px;
  p {
    padding-top: 8px;
  }
`;

const StyledSectionHeader = styled.div`
  display: flex;
  align-items: center;
  .arrow-button {
    ${props =>
      props.theme.interfaceDirection === "rtl"
        ? css`
            margin-left: 16px;
            transform: scaleX(-1);
          `
        : css`
            margin-right: 16px;
          `}
  }
`;
export { StyledTextContent, StyledSectionBodyContent, StyledSectionHeader };

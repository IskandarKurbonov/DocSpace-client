import styled from "styled-components";

import { Base } from "@docspace/components/themes";

export const MainContainer = styled.div`
  width: 100%;

  .subtitle {
    margin-bottom: 20px;
    color: ${(props) => props.theme.client.settings.common.descriptionColor};
  }

  .settings_tabs {
    padding-bottom: 16px;
  }

  .page_loader {
    position: fixed;

    ${({ theme }) =>
      theme.interfaceDirection === "rtl" ? `right: 50%;` : `left: 50%;`}
  }
`;

MainContainer.defaultProps = { theme: Base };

export const StyledCategoryWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 4px;
  margin-bottom: 8px;
  align-items: center;
`;

export const StyledTooltip = styled.div`
  .subtitle {
    margin-bottom: 10px;
  }
`;

export const LearnMoreWrapper = styled.div`
  display: none;

  @media (max-width: 600px) {
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
    line-height: 20px;
  }

  .page-subtitle {
    color: ${(props) =>
      props.theme.client.settings.security.descriptionColor} !important;
  }

  .learn-subtitle {
    margin-bottom: 10px;
  }
`;

export const StyledBruteForceProtection = styled.div`
  width: 100%;

  .brute-force-protection-input {
    width: 100%;
    max-width: 350px;
  }

  .error-text {
    position: absolute;
    font-size: 10px;
    color: #f21c0e;
  }

  .save-cancel-buttons {
    margin-top: 24px;
  }

  .input-container {
    margin-bottom: 8px;
  }

  .mobile-description {
    margin-bottom: 12px;
  }

  .description {
    max-width: 700px;
    padding-bottom: 19px;

    .page-subtitle {
      line-height: 20px;
      color: ${(props) =>
        props.theme.client.settings.security.descriptionColor};
      padding-bottom: 7px;
    }

    .link {
      line-height: 15px;
      font-weight: 600;
      color: ${(props) =>
        props.theme.client.settings.security.descriptionColor};
      text-decoration: underline;
    }

    @media (max-width: 600px) {
      padding-bottom: 20px;
    }
  }
`;

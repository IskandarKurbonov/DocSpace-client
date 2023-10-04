import styled, { css } from "styled-components";
import { tablet, hugeMobile } from "@docspace/components/utils/device";

export const ButtonsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 213px 0 213px;
  width: 320px;

  @media ${tablet} {
    width: 100%;
  }
`;

interface ILoginFormWrapperProps {
  enabledJoin?: boolean;
  isDesktop?: boolean;
  bgPattern?: string;
}

interface ILoginContentProps {
  enabledJoin?: boolean;
}

interface IStyledCaptchaProps {
  isCaptchaError?: boolean;
  theme?: IUserTheme;
}

export const LoginFormWrapper = styled.div`
  display: grid;
  grid-template-rows: ${(props: ILoginFormWrapperProps) =>
    props.enabledJoin
      ? props.isDesktop
        ? css`1fr 10px`
        : css`1fr 68px`
      : css`1fr`};
  width: 100%;
  box-sizing: border-box;

  @media ${hugeMobile} {
    height: calc(100vh - 48px);
  }

  .bg-cover {
    background-image: ${(props) => props.bgPattern};
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-size: cover;
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;

    @media ${hugeMobile} {
      background-image: none;
    }
  }
`;

export const LoginContent = styled.div`
  min-height: ${(props: ILoginContentProps) =>
    props.enabledJoin ? "calc(100vh - 68px)" : "100vh"};
  flex: 1 0 auto;
  flex-direction: column;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;

  @media ${hugeMobile} {
    min-height: 100%;
    justify-content: start;
  }
`;

export const StyledCaptcha = styled.div`
  margin: 24px 0;

  width: fit-content;
  .captcha-wrapper {
    ${(props: IStyledCaptchaProps) =>
      props.isCaptchaError &&
      css`
        border: ${props.theme.login.captcha.border};
        padding: 4px 4px 4px 2px;
      `};

    margin-bottom: 2px;
  }

  ${(props: IStyledCaptchaProps) =>
    props.isCaptchaError &&
    css`
      p {
        color: ${props.theme.login.captcha.color};
      }
    `}
`;

export const OAuthLinksContainer = styled.div`
  margin-top: 32px;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
`;

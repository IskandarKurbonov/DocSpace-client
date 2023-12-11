import React from "react";
import ModalDialog from "@docspace/components/modal-dialog";
import Text from "@docspace/components/text";
import Button from "@docspace/components/button";
import { providersData } from "../../constants";
import styled, { css } from "styled-components";
import { ReactSVG } from "react-svg";
import { getProviderTranslation } from "../../utils";
import SsoReactSvgUrl from "PUBLIC_DIR/images/sso.react.svg?url";
import { mobile } from "@docspace/components/utils/device";

const ProviderRow = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;

  justify-content: flex-start;
  align-items: center;
  align-content: center;
  padding: 8px 0;

  svg {
    height: 24px;
    width: 24px;
    ${(props) =>
      props.theme.interfaceDirection === "rtl"
        ? css`
            padding-right: 4px;
          `
        : css`
            padding-left: 4px;
          `}

    path {
      fill: ${(props) => !props.theme.isBase && "#fff"};
    }
  }

  .provider-name {
    ${(props) =>
      props.theme.interfaceDirection === "rtl"
        ? css`
            padding-right: 12px;
          `
        : css`
            padding-left: 12px;
          `}
    line-height: 16px;
  }

  .signin-button {
    ${(props) =>
      props.theme.interfaceDirection === "rtl"
        ? css`
            margin-right: auto;
          `
        : css`
            margin-left: auto;
          `}
  }
`;

const Modal = styled(ModalDialog)`
  .modal-dialog-aside {
    transform: translateX(${(props) => (props.visible ? "0" : "480px")});
    width: 480px;

    @media ${mobile} {
      width: 325px;
      transform: translateX(${(props) => (props.visible ? "0" : "480px")});
    }
  }
`;

interface IMoreLoginNodalProps {
  visible: boolean;
  onClose: VoidFunction;
  providers: ProvidersType;
  onSocialLoginClick: (
    e: HTMLElementEvent<HTMLButtonElement | HTMLElement>
  ) => void;
  ssoLabel: string;
  ssoUrl: string;
  t: TFuncType;
  isSignUp: boolean;
}

const MoreLoginModal: React.FC<IMoreLoginNodalProps> = (props) => {
  const {
    t,
    visible,
    onClose,
    providers,
    onSocialLoginClick,
    ssoLabel,
    ssoUrl,
    isSignUp,
  } = props;

  console.log("more login render", props);

  return (
    <Modal
      displayType="aside"
      visible={visible}
      onClose={onClose}
      removeScroll={true}
    >
      <ModalDialog.Header>{t("Common:Authorization")}</ModalDialog.Header>
      <ModalDialog.Body>
        {ssoUrl && (
          <ProviderRow key={`ProviderItemSSO`}>
            <ReactSVG src={SsoReactSvgUrl} />
            <Text
              fontSize="14px"
              fontWeight="600"
              className="provider-name"
              noSelect
            >
              {ssoLabel || getProviderTranslation("sso", t, false, isSignUp)}
            </Text>
            <Button
              label={t("Common:LoginButton")}
              className="signin-button"
              size="small"
              onClick={() => (window.location.href = ssoUrl)}
            />
          </ProviderRow>
        )}
        {providers?.map((item, index) => {
          if (!providersData[item.provider]) return;

          const { icon, label } = providersData[item.provider];

          return (
            <ProviderRow key={`ProviderItem${index}`}>
              <ReactSVG src={icon} />
              <Text
                fontSize="14px"
                fontWeight="600"
                className="provider-name"
                noSelect
              >
                {getProviderTranslation(label, t, false, isSignUp)}
              </Text>
              <Button
                label={t("Common:LoginButton")}
                className="signin-button"
                size="small"
                data-url={item.url}
                data-providername={item.provider}
                onClick={onSocialLoginClick}
              />
            </ProviderRow>
          );
        })}
      </ModalDialog.Body>
    </Modal>
  );
};

export default MoreLoginModal;

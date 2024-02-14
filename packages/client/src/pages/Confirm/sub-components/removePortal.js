import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { withTranslation, Trans } from "react-i18next";
import { inject, observer } from "mobx-react";
import { Text } from "@docspace/shared/components/text";
import { Button } from "@docspace/shared/components/button";
import { Link } from "@docspace/shared/components/link";
import { toastr } from "@docspace/shared/components/toast";

import { deletePortal } from "@docspace/shared/api/portal";
import {
  StyledPage,
  StyledBody,
  StyledContent,
  ButtonsWrapper,
} from "./StyledConfirm";

import withLoader from "../withLoader";

import { FormWrapper } from "@docspace/shared/components/form-wrapper";
import DocspaceLogo from "../../../components/DocspaceLogoWrapper";

const RemovePortal = (props) => {
  const { t, greetingTitle, linkData, companyInfoSettingsData } = props;
  const [isRemoved, setIsRemoved] = useState(false);
  const navigate = useNavigate();

  const url = companyInfoSettingsData?.site
    ? companyInfoSettingsData.site
    : "https://onlyoffice.com";

  const onDeleteClick = async () => {
    try {
      await deletePortal(linkData.confirmHeader);
      setIsRemoved(true);
      setTimeout(() => (location.href = url), 10000);
    } catch (e) {
      toastr.error(e);
    }
  };

  const onCancelClick = () => {
    navigate("/");
  };

  return (
    <StyledPage>
      <StyledContent>
        <StyledBody>
          <DocspaceLogo className="docspace-logo" />
          <Text fontSize="23px" fontWeight="700" className="title">
            {greetingTitle}
          </Text>

          <FormWrapper>
            {isRemoved ? (
              <Text>
                <Trans t={t} i18nKey="SuccessRemoved" ns="Confirm">
                  Your account has been successfully removed. In 10 seconds you
                  will be redirected to the
                  <Link isHovered href={url}>
                    site
                  </Link>
                </Trans>
              </Text>
            ) : (
              <>
                <Text className="subtitle">{t("PortalRemoveTitle")}</Text>
                <ButtonsWrapper>
                  <Button
                    primary
                    scale
                    size="medium"
                    label={t("Common:Delete")}
                    tabIndex={1}
                    onClick={onDeleteClick}
                  />
                  <Button
                    scale
                    size="medium"
                    label={t("Common:CancelButton")}
                    tabIndex={1}
                    onClick={onCancelClick}
                  />
                </ButtonsWrapper>
              </>
            )}
          </FormWrapper>
        </StyledBody>
      </StyledContent>
    </StyledPage>
  );
};

export default inject(({ settingsStore }) => ({
  greetingTitle: settingsStore.greetingSettings,
  theme: settingsStore.theme,
  companyInfoSettingsData: settingsStore.companyInfoSettingsData,
}))(withTranslation(["Confirm", "Common"])(withLoader(observer(RemovePortal))));

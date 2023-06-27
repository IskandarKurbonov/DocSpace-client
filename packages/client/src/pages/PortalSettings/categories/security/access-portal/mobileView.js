import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { withTranslation } from "react-i18next";
import { setDocumentTitle } from "SRC_DIR/helpers/utils";
import { MainContainer } from "../StyledSecurity";
import MobileCategoryWrapper from "../sub-components/mobile-category-wrapper";

const MobileView = (props) => {
  const { t } = props;

  const navigate = useNavigate();

  useEffect(() => {
    setDocumentTitle(t("PortalAccess"));
  }, []);

  const onClickLink = (e) => {
    e.preventDefault();
    navigate(e.target.pathname);
  };

  return (
    <MainContainer>
      <MobileCategoryWrapper
        title={t("SettingPasswordStrength")}
        subtitle={t("SettingPasswordStrengthDescription")}
        url="/portal-settings/security/access-portal/password"
        onClickLink={onClickLink}
      />
      <MobileCategoryWrapper
        title={t("TwoFactorAuth")}
        subtitle={t("TwoFactorAuthDescription")}
        url="/portal-settings/security/access-portal/tfa"
        onClickLink={onClickLink}
      />
      <MobileCategoryWrapper
        title={t("TrustedMail")}
        subtitle={t("TrustedMailDescription")}
        url="/portal-settings/security/access-portal/trusted-mail"
        onClickLink={onClickLink}
      />
      <MobileCategoryWrapper
        title={t("IPSecurity")}
        subtitle={t("IPSecurityDescription")}
        url="/portal-settings/security/access-portal/ip"
        onClickLink={onClickLink}
      />
      <MobileCategoryWrapper
        title={t("AdminsMessage")}
        subtitle={t("AdminsMessageDescription")}
        url="/portal-settings/security/access-portal/admin-message"
        onClickLink={onClickLink}
      />
      <MobileCategoryWrapper
        title={t("SessionLifetime")}
        subtitle={t("SessionLifetimeDescription")}
        url="/portal-settings/security/access-portal/lifetime"
        onClickLink={onClickLink}
      />
    </MainContainer>
  );
};

export default withTranslation("Settings")(MobileView);

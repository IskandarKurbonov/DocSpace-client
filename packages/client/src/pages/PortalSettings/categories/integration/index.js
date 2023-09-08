import React, { useEffect, useState } from "react";
import Submenu from "@docspace/components/submenu";
import { useNavigate } from "react-router-dom";
import { withTranslation } from "react-i18next";
import { inject, observer } from "mobx-react";
import { combineUrl } from "@docspace/common/utils";
import config from "PACKAGE_FILE";
import { isMobile } from "react-device-detect";

import SSO from "./SingleSignOn";
import ThirdParty from "./ThirdPartyServicesSettings";

import AppLoader from "@docspace/common/components/AppLoader";
import SSOLoader from "./sub-components/ssoLoader";
import SMTPSettings from "./SMTPSettings";

const IntegrationWrapper = (props) => {
  const { t, tReady, enablePlugins, toDefault, isSSOAvailable } = props;
  const [currentTab, setCurrentTab] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    return () => {
      isSSOAvailable && toDefault();
    };
  }, []);

  const data = [
    {
      id: "third-party-services",
      name: t("Translations:ThirdPartyTitle"),
      content: <ThirdParty />,
    },
    {
      id: "single-sign-on",
      name: t("SingleSignOn"),
      content: <SSO />,
    },
    {
      id: "smtp-settings",
      name: t("SMTPSettings"),
      content: <SMTPSettings />,
    },
  ];

  const load = async () => {
    const path = location.pathname;
    const currentTab = data.findIndex((item) => path.includes(item.id));
    if (currentTab !== -1) setCurrentTab(currentTab);

    setIsLoading(true);
  };

  useEffect(() => {
    load();
  }, []);

  const onSelect = (e) => {
    navigate(
      combineUrl(
        window.DocSpaceConfig?.proxy?.url,
        config.homepage,
        `/portal-settings/integration/${e.id}`
      )
    );
  };

  if (!isLoading && !tReady)
    return currentTab === 0 ? <SSOLoader /> : <AppLoader />;

  return <Submenu data={data} startSelect={currentTab} onSelect={onSelect} />;
};

export default inject(({ auth, ssoStore }) => {
  const { load: toDefault } = ssoStore;
  const { enablePlugins } = auth.settingsStore;
  const { isSSOAvailable } = auth.currentQuotaStore;

  return {
    enablePlugins,
    toDefault,
    isSSOAvailable,
  };
})(
  withTranslation(["Settings", "SingleSignOn", "Translations"])(
    observer(IntegrationWrapper)
  )
);

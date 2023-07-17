import React, { useEffect, useState, useTransition, Suspense } from "react";
import styled, { css } from "styled-components";
import Submenu from "@docspace/components/submenu";
import { inject, observer } from "mobx-react";
import { combineUrl } from "@docspace/common/utils";
import config from "PACKAGE_FILE";

import { useNavigate } from "react-router-dom";

import JavascriptSDK from "./JavascriptSDK";
import Webhooks from "./Webhooks";
import PluginPage from "./Plugins";

import AppLoader from "@docspace/common/components/AppLoader";
import SSOLoader from "./sub-components/ssoLoader";
import { WebhookConfigsLoader } from "./Webhooks/sub-components/Loaders";

import { useTranslation } from "react-i18next";
import { isMobile, isMobileOnly } from "react-device-detect";

const StyledSubmenu = styled(Submenu)`
  .sticky {
    margin-top: ${() => (isMobile ? "0" : "4px")};
    z-index: 201;
    ${() =>
      isMobileOnly &&
      css`
        top: 58px;
      `}
  }
`;

const DeveloperToolsWrapper = (props) => {
  const { loadBaseInfo } = props;
  const navigate = useNavigate();

  const { t, ready } = useTranslation([
    "JavascriptSdk",
    "Webhooks",
    "PluginsSettings",
  ]);
  const [isPending, startTransition] = useTransition();

  const data = [
    {
      id: "javascript-sdk",
      name: t("JavascriptSdk"),
      content: <JavascriptSDK />,
    },
    {
      id: "webhooks",
      name: t("Webhooks:Webhooks"),
      content: <Webhooks />,
    },
    {
      id: "plugins",
      name: t("PluginsSettings:Plugins"),
      content: <PluginPage />,
    },
  ];

  const [currentTab, setCurrentTab] = useState(
    data.findIndex((item) => location.pathname.includes(item.id))
  );

  const load = async () => {
    await loadBaseInfo();
  };

  useEffect(() => {
    const path = location.pathname;
    const currentTab = data.findIndex((item) => path.includes(item.id));
    if (currentTab !== -1) {
      setCurrentTab(currentTab);
    }
  }, []);

  useEffect(() => {
    ready && startTransition(load);
  }, [ready]);

  const onSelect = (e) => {
    navigate(
      combineUrl(
        window.DocSpaceConfig?.proxy?.url,
        config.homepage,
        `/portal-settings/developer-tools/${e.id}`
      )
    );
  };

  const loaders = [<SSOLoader />, <AppLoader />];

  return (
    <Suspense fallback={loaders[currentTab] || <AppLoader />}>
      <StyledSubmenu data={data} startSelect={currentTab} onSelect={onSelect} />
    </Suspense>
  );
};

export default inject(({ setup }) => {
  const { initSettings } = setup;

  return {
    loadBaseInfo: async () => {
      await initSettings();
    },
  };
})(observer(DeveloperToolsWrapper));

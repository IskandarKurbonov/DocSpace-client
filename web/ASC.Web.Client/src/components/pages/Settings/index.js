import React, { lazy, Suspense } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { withRouter } from "react-router";
import Layout from "./Layout";
import { combineUrl } from "@appserver/common/utils";
import AppServerConfig from "@appserver/common/constants/AppServerConfig";

const SecuritySettings = lazy(() =>
  import("./categories/security/accessRights")
);
const AccessPortal = lazy(() => import("./categories/security/accessPortal"));
const TfaPage = lazy(() => import("./categories/security/tfa"));

const CustomizationSettings = lazy(() =>
  import("./categories/common/customization")
);
const LanguageAndTimeZoneSettings = lazy(() =>
  import("./categories/common/language-and-time-zone")
);
const CustomTitles = lazy(() => import("./categories/common/custom-titles"));
const TeamTemplate = lazy(() => import("./categories/common/team-template"));
const ThirdPartyServices = lazy(() =>
  import("./categories/integration/thirdPartyServicesSettings")
);
const DataManagementSettings = lazy(() =>
  import("./categories/data-management/backup")
);
const AutomaticBackup = lazy(() =>
  import("./categories/data-management/automatic-backup.js")
);
const ManualBackup = lazy(() =>
  import("./categories/data-management/manual-backup.js")
);
const RestoreBackup = lazy(() =>
  import("./categories/data-management/restore-backup.js")
);
//const WhiteLabel = lazy(() => import("./categories/common/whitelabel"));
const PROXY_BASE_URL = combineUrl(AppServerConfig.proxyURL, "/settings");

const CUSTOMIZATION_URLS = [
  combineUrl(PROXY_BASE_URL, "/common/customization"),
  combineUrl(PROXY_BASE_URL, "/common"),
  PROXY_BASE_URL,
];
const LTZ_URL = combineUrl(
  PROXY_BASE_URL,
  "/common/customization/language-and-time-zone"
);
const CUSTOM_TITLE_URL = combineUrl(
  PROXY_BASE_URL,
  "/common/customization/custom-titles"
);
const TEAM_TEMPLATE_URL = combineUrl(
  PROXY_BASE_URL,
  "/common/customization/team-template"
);
//const WHITELABEL_URL = combineUrl(PROXY_BASE_URL, "/common/whitelabel");
const SECURITY_URL = combineUrl(PROXY_BASE_URL, "/security/accessrights");
const ACCESS_PORTAL_URL = combineUrl(PROXY_BASE_URL, "/security/accessportal");
const TFA_PAGE_URL = combineUrl(PROXY_BASE_URL, "/security/accessportal/tfa");

const THIRD_PARTY_URL = combineUrl(
  PROXY_BASE_URL,
  "/integration/third-party-services"
);
const DATA_MANAGEMENT_URL = combineUrl(
  PROXY_BASE_URL,
  "/datamanagement/backup"
);

const AUTOMATIC_BACKUP_URL = combineUrl(
  PROXY_BASE_URL,
  "/datamanagement/backup/automatic-backup"
);
const MANUAL_BACKUP_URL = combineUrl(
  PROXY_BASE_URL,
  "/datamanagement/backup/manual-backup"
);
const RESTORE_BACKUP_URL = combineUrl(
  PROXY_BASE_URL,
  "/datamanagement/backup/restore-backup"
);
const ERROR_404_URL = combineUrl(AppServerConfig.proxyURL, "/error/404");
console.log();
const Settings = () => {
  return (
    <Layout key="1">
      <Suspense fallback={null}>
        <Switch>
          <Route
            exact
            path={CUSTOMIZATION_URLS}
            component={CustomizationSettings}
          />
          <Route exact path={LTZ_URL} component={LanguageAndTimeZoneSettings} />
          <Route exact path={CUSTOM_TITLE_URL} component={CustomTitles} />
          <Route exact path={TEAM_TEMPLATE_URL} component={TeamTemplate} />
          {/* <Route
            exact
            path={WHITELABEL_URL}
            component={WhiteLabel}
          /> */}
          <Route exact path={SECURITY_URL} component={SecuritySettings} />
          <Route exact path={ACCESS_PORTAL_URL} component={AccessPortal} />
          <Route exact path={TFA_PAGE_URL} component={TfaPage} />

          <Route exact path={THIRD_PARTY_URL} component={ThirdPartyServices} />
          <Route
            exact
            path={DATA_MANAGEMENT_URL}
            component={DataManagementSettings}
          />
          <Route
            exact
            path={AUTOMATIC_BACKUP_URL}
            component={AutomaticBackup}
          />
          <Route exact path={MANUAL_BACKUP_URL} component={ManualBackup} />
          <Route exact path={RESTORE_BACKUP_URL} component={RestoreBackup} />
          <Redirect
            to={{
              pathname: ERROR_404_URL,
            }}
          />
        </Switch>
      </Suspense>
    </Layout>
  );
};

export default withRouter(Settings);

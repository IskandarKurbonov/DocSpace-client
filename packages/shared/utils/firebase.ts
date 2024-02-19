/* eslint-disable no-console */
/* eslint-disable prefer-promise-reject-errors */
/* eslint-disable class-methods-use-this */
import firebase from "firebase/app";
import "firebase/remote-config";
import "firebase/storage";
import "firebase/database";

import CampaignsCloudPngUrl from "PUBLIC_DIR/images/campaigns.cloud.png";
import CampaignsDesktopPngUrl from "PUBLIC_DIR/images/campaigns.desktop.png";
import CampaignsEducationPngUrl from "PUBLIC_DIR/images/campaigns.education.png";
import CampaignsEnterprisePngUrl from "PUBLIC_DIR/images/campaigns.enterprise.png";
import CampaignsIntegrationPngUrl from "PUBLIC_DIR/images/campaigns.integration.png";

import { TFirebaseSettings } from "../api/settings/types";

class FirebaseHelper {
  remoteConfig: firebase.remoteConfig.RemoteConfig | null = null;

  firebaseConfig: TFirebaseSettings | null = null;

  firebaseStorage: firebase.storage.Storage | null = null;

  firebaseDB: firebase.database.Database | null = null;

  constructor(settings: TFirebaseSettings) {
    this.firebaseConfig = settings;

    if (!this.isEnabled) return;

    if (!firebase.apps.length) {
      if (this.config) firebase.initializeApp(this.config);
    } else {
      firebase.app();
    }

    this.firebaseStorage = firebase.storage();

    this.remoteConfig = firebase.remoteConfig();

    this.firebaseDB = firebase.database();

    this.remoteConfig.settings = {
      fetchTimeoutMillis: 3600000,
      minimumFetchIntervalMillis: 3600000,
    };

    this.remoteConfig.defaultConfig = {
      maintenance: false,
    };

    this.remoteConfig
      .ensureInitialized()
      .then(() => {
        console.log("Firebase Remote Config is initialized");
      })
      .catch((err) => {
        console.error("Firebase Remote Config failed to initialize", err);
      });
  }

  get config() {
    return this.firebaseConfig;
  }

  get isEnabled() {
    return (
      !!this.config &&
      !!this.config?.apiKey &&
      !!this.config?.authDomain &&
      !!this.config?.projectId &&
      !!this.config?.storageBucket &&
      !!this.config?.messagingSenderId &&
      !!this.config?.appId &&
      !window.navigator.userAgent.includes("ZoomWebKit") && // Disabled firebase for Zoom - unknown 403 error inside iframe
      !window.navigator.userAgent.includes("ZoomApps")
    );
  }

  get isEnabledDB() {
    return this.isEnabled && !!this.config?.databaseURL;
  }

  async checkMaintenance() {
    if (!this.isEnabled) return Promise.reject("Not enabled");

    // const res = await this.remoteConfig?.fetchAndActivate();
    await this.remoteConfig?.fetchAndActivate();
    // console.log("fetchAndActivate", res);
    const maintenance = this.remoteConfig?.getValue("maintenance");
    if (!maintenance) {
      return Promise.resolve(null);
    }
    return Promise.resolve(JSON.parse(maintenance.asString()));
  }

  async checkBar() {
    if (!this.isEnabled) return Promise.reject("Not enabled");

    // const res = await this.remoteConfig?.fetchAndActivate();
    await this.remoteConfig?.fetchAndActivate();
    const barValue = this.remoteConfig?.getValue("docspace_bar");
    const barString = barValue && barValue.asString();

    if (!barValue || !barString) {
      return Promise.resolve([]);
    }
    const list = JSON.parse(barString);

    if (!list || !(list instanceof Array)) return Promise.resolve([]);

    const bar = list.filter((element) => {
      return typeof element === "string" && element.length > 0;
    });

    return Promise.resolve(bar);
  }

  async checkCampaigns() {
    if (!this.isEnabled) return Promise.reject("Not enabled");

    // const res = await this.remoteConfig?.fetchAndActivate();
    await this.remoteConfig?.fetchAndActivate();

    const campaignsValue = this.remoteConfig?.getValue("campaigns");
    const campaignsString = campaignsValue && campaignsValue.asString();

    if (!campaignsValue || !campaignsString) {
      return Promise.resolve([]);
    }

    const list = JSON.parse(campaignsString);

    if (!list || !(list instanceof Array)) return Promise.resolve([]);

    const campaigns = list.filter((element) => {
      return typeof element === "string" && element.length > 0;
    });

    return Promise.resolve(campaigns);
  }

  async getCampaignsImages(banner: string) {
    // const domain = this.config["authDomain"];

    switch (banner) {
      case "cloud":
        return CampaignsCloudPngUrl;
      case "desktop":
        return CampaignsDesktopPngUrl;
      case "education":
        return CampaignsEducationPngUrl;
      case "enterprise":
        return CampaignsEnterprisePngUrl;
      case "integration":
        return CampaignsIntegrationPngUrl;
      default:
        return "";
    }

    // return `https://${domain}/images/campaigns.${banner}.png`;
  }

  async getCampaignsTranslations(banner: string, lng: string) {
    const domain = this.config?.authDomain;
    return `https://${domain}/locales/${lng}/CampaignPersonal${banner}.json`;
  }

  async sendCrashReport<T>(report: T) {
    try {
      const reportListRef = this.firebaseDB?.ref("reports");
      const neReportRef = reportListRef?.push();
      neReportRef?.set(report);
    } catch (error) {
      return Promise.reject(error);
    }
  }
}

export default FirebaseHelper;

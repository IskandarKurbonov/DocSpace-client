import React from "react";
import PropTypes from "prop-types";
import Section from "@docspace/shared/components/section";
import SectionWrapper from "SRC_DIR/components/Section";
import { SectionHeaderContent, SectionBodyContent } from "./Section";

import Dialogs from "../Home/Section/AccountsBody/Dialogs";

import withCultureNames from "@docspace/common/hoc/withCultureNames";
import { inject, observer } from "mobx-react";
import { withTranslation } from "react-i18next";

class Profile extends React.Component {
  componentDidMount() {
    const {
      fetchProfile,
      profile,
      t,
      setDocumentTitle,

      setIsEditTargetUser,

      isVisitor,
      selectedTreeNode,
      setSelectedNode,
      setIsProfileLoaded,
      getTfaType,
    } = this.props;

    const userId = "@self";

    setIsEditTargetUser(false);

    isVisitor
      ? !selectedTreeNode.length && setSelectedNode(["@rooms"])
      : setSelectedNode(["accounts"]);

    setDocumentTitle(t("Common:Profile"));
    this.documentElement = document.getElementsByClassName("hidingHeader");
    // const queryString = ((location && location.search) || "").slice(1);
    // const queryParams = queryString.split("&");
    // const arrayOfQueryParams = queryParams.map((queryParam) =>
    //   queryParam.split("=")
    // );
    // const linkParams = Object.fromEntries(arrayOfQueryParams);

    // if (linkParams.email_change && linkParams.email_change === "success") {
    //   toastr.success(t("ChangeEmailSuccess"));
    // }

    getTfaType();

    if (!profile || profile.userName !== userId) {
      fetchProfile(userId).finally(() => {
        setIsProfileLoaded(true);
      });
    }

    if (!profile && this.documentElement) {
      for (var i = 0; i < this.documentElement.length; i++) {
        this.documentElement[i].style.transition = "none";
      }
    }
  }

  componentDidUpdate(prevProps) {
    const { fetchProfile, profile } = this.props;
    // const { userId } = match.params;
    // const prevUserId = prevProps.match.params.userId;

    // if (userId !== undefined && userId !== prevUserId) {

    //   fetchProfile(userId);
    // }

    if (profile && this.documentElement) {
      for (var i = 0; i < this.documentElement.length; i++) {
        this.documentElement[i].style.transition = "";
      }
    }
  }

  render() {
    // console.log("Profile render");

    const { profile, showCatalog, setIsLoading } = this.props;

    return (
      <>
        <SectionWrapper withBodyAutoFocus viewAs="profile">
          <Section.SectionHeader>
            <SectionHeaderContent
              profile={profile}
              setIsLoading={setIsLoading}
            />
          </Section.SectionHeader>

          <Section.SectionBody>
            <SectionBodyContent profile={profile} />
          </Section.SectionBody>
        </SectionWrapper>
        <Dialogs />
      </>
    );
  }
}

Profile.propTypes = {
  fetchProfile: PropTypes.func.isRequired,
  profile: PropTypes.object,
  language: PropTypes.string,
};

export default inject(
  ({
    authStore,
    settingsStore,
    peopleStore,
    userStore,
    clientLoadingStore,
    tfaStore,
    treeFoldersStore,
  }) => {
    const { setDocumentTitle, language } = authStore;

    const {
      setIsProfileLoaded,
      setIsSectionHeaderLoading,
      setIsSectionBodyLoading,
      setIsSectionFilterLoading,
    } = clientLoadingStore;

    const setIsLoading = () => {
      setIsSectionHeaderLoading(true, false);
      setIsSectionFilterLoading(true, false);
      setIsSectionBodyLoading(true, false);
    };

    const { targetUserStore } = peopleStore;
    const {
      getTargetUser: fetchProfile,
      targetUser: profile,
      isEditTargetUser,
      setIsEditTargetUser,
    } = targetUserStore;

    const { selectedTreeNode, setSelectedNode } = treeFoldersStore;

    const { getTfaType } = tfaStore;

    return {
      setDocumentTitle,
      language,
      fetchProfile,
      profile,

      isEditTargetUser,
      setIsEditTargetUser,

      showCatalog: settingsStore.showCatalog,

      selectedTreeNode,
      setSelectedNode,
      isVisitor: userStore.user.isVisitor,
      setIsProfileLoaded,
      setIsLoading,
      getTfaType,
    };
  },
)(observer(withTranslation(["Profile", "Common"])(withCultureNames(Profile))));

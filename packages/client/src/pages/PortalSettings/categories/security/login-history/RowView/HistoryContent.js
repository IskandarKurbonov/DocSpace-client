import React from "react";
import { inject, observer } from "mobx-react";
import styled from "styled-components";

import { Text } from "@docspace/shared/components/text";
import { RowContent } from "@docspace/shared/components/row-content";
import { convertTime } from "@docspace/shared/utils/convertTime";

import { UnavailableStyles } from "../../../../utils/commonSettingsStyles";

const StyledRowContent = styled(RowContent)`
  padding-bottom: 10px;
  .user-container-wrapper {
    p {
      color: ${(props) =>
        props.theme.client.settings.security.loginHistory.nameColor};
    }
  }
  .mainIcons {
    p {
      color: ${(props) =>
        props.theme.client.settings.security.loginHistory.sideColor};
    }
  }
  .row-main-container-wrapper {
    display: flex;
    justify-content: flex-start;
    width: min-content;
  }

  ${(props) => props.isSettingNotPaid && UnavailableStyles}
`;

const HistoryContent = ({ sectionWidth, item, locale, theme }) => {
  const dateStr = convertTime(item.date, locale);

  return (
    <StyledRowContent
      sideColor={theme.client.settings.security.loginHistory.sideColor}
      nameColor={theme.client.settings.security.loginHistory.nameColor}
      sectionWidth={sectionWidth}
    >
      <div className="user-container-wrapper">
        <Text
          fontWeight={600}
          fontSize="14px"
          isTextOverflow={true}
          className="settings_unavailable"
        >
          {item.user}
        </Text>
      </div>

      <Text
        containerMinWidth="120px"
        fontSize="12px"
        fontWeight={600}
        truncate={true}
        color="#A3A9AE"
        className="settings_unavailable"
      >
        {dateStr}
      </Text>
      <Text
        fontSize="12px"
        as="div"
        fontWeight={600}
        className="settings_unavailable"
      >
        {item.action}
      </Text>
    </StyledRowContent>
  );
};

export default inject(({ settingsStore, userStore }) => {
  const { culture, theme } = settingsStore;
  const { user } = userStore;
  const locale = (user && user.cultureName) || culture || "en";

  return {
    locale,
    theme,
  };
})(observer(HistoryContent));

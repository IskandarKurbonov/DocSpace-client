import React from "react";
import { inject, observer } from "mobx-react";
import { useTranslation } from "react-i18next";

import Text from "@docspace/components/text";
import Badge from "@docspace/components/badge";

import ItemIcon from "SRC_DIR/components/ItemIcon";
import SpaceQuota from "SRC_DIR/components/SpaceQuota";

import { StyledStatistics } from "./StyledComponent";

import RoomsList from "./sub-components/RoomsList";
import UsersList from "./sub-components/UsersList";

const buttonProps = {
  className: "button-element",
  size: "small",
};
const StatisticsComponent = (props) => {
  const { t } = useTranslation("Settings");
  const { isItemQuotaAvailable } = props;
  const iconElement = (
    id,
    icon,
    fileExst,
    isRoom,
    defaultRoomIcon,
    className
  ) => (
    <div className={className}>
      <ItemIcon
        id={id}
        icon={icon}
        fileExst={fileExst}
        isRoom={isRoom}
        defaultRoomIcon={defaultRoomIcon}
      />
    </div>
  );
  const quotaElement = (item) => (
    <SpaceQuota isDisabledQuotaChange item={item} />
  );
  const textElement = (title) => (
    <div className="row_name">
      <Text fontSize={"12px"} fontWeight={600}>
        {title}
      </Text>
    </div>
  );

  return (
    <StyledStatistics>
      <div className="title-container">
        <Text fontWeight={700} fontSize={"16px"} className="statistics_title">
          {t("Statistic")}
        </Text>
        {!isItemQuotaAvailable && (
          <Badge
            backgroundColor="#EDC409"
            label={t("Common:Paid")}
            className="paid-badge"
            isPaidBadge
          />
        )}
      </div>
      <Text className="statistics-description">
        {t("StatisticDescription")}
      </Text>
      {isItemQuotaAvailable && (
        <>
          <RoomsList
            buttonProps={buttonProps}
            textElement={textElement}
            quotaElement={quotaElement}
            iconElement={iconElement}
          />
          <UsersList
            buttonProps={buttonProps}
            textElement={textElement}
            quotaElement={quotaElement}
            iconElement={iconElement}
          />
        </>
      )}
    </StyledStatistics>
  );
};

export default inject(({ auth }) => {
  const { currentQuotaStore } = auth;
  const { isItemQuotaAvailable } = currentQuotaStore;

  return {
    isItemQuotaAvailable,
  };
})(observer(StatisticsComponent));

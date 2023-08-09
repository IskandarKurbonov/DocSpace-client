import React from "react";
import moment from "moment";
import { useTranslation } from "react-i18next";

import Text from "@docspace/components/text";

import { StyledMainInfo } from "./StyledComponent";

const MainInfoComponent = (props) => {
  const { portalInfo, activeUsersCount } = props;
  const { t } = useTranslation("Settings");

  const creationDate = moment(portalInfo.creationDateTime).format("l");

  return (
    <StyledMainInfo>
      <Text fontSize={"14px"} fontWeight={700}>
        {t("PortalCreatedDate", { date: creationDate })}
      </Text>
      <Text fontSize={"14px"} fontWeight={700}>
        {t("NumberOfActiveEmployees", { count: activeUsersCount })}
      </Text>
    </StyledMainInfo>
  );
};

export default MainInfoComponent;

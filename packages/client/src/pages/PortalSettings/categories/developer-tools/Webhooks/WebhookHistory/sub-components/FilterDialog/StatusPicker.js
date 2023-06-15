import React from "react";
import styled from "styled-components";
import { inject, observer } from "mobx-react";

import Text from "@docspace/components/text";
import Button from "@docspace/components/button";
import { useTranslation } from "react-i18next";

const RoundedButton = styled(Button)`
  box-sizing: border-box;
  font-size: 13px;
  font-weight: 400;
  padding: 13.5px 15px;

  border-radius: 16px;
  margin-right: 7px;

  line-height: 20px;
`;

const StatusBadgeSelector = ({ label, statusCode, isStatusSelected, handleStatusClick }) => {
  const handleOnClick = () => handleStatusClick(statusCode);
  return (
    <RoundedButton label={label} onClick={handleOnClick} primary={isStatusSelected(statusCode)} />
  );
};

const StatusPicker = ({ Selectors, filters, setFilters }) => {
  const { t } = useTranslation(["Webhooks", "People"]);

  const StatusCodes = ["Not sent", "2XX", "3XX", "4XX", "5XX"];

  const isStatusSelected = (statusCode) => {
    return filters.status.includes(statusCode);
  };
  const handleStatusClick = (statusCode) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      status: prevFilters.status.includes(statusCode)
        ? prevFilters.status.filter((statusItem) => statusItem !== statusCode)
        : [...prevFilters.status, statusCode],
    }));
  };

  const StatusBadgeElements = StatusCodes.map((code) =>
    code === "Not sent" ? (
      <StatusBadgeSelector
        label={t("NotSent")}
        statusCode={code}
        isStatusSelected={isStatusSelected}
        handleStatusClick={handleStatusClick}
        key={code}
      />
    ) : (
      <StatusBadgeSelector
        label={code}
        statusCode={code}
        isStatusSelected={isStatusSelected}
        handleStatusClick={handleStatusClick}
        key={code}
      />
    ),
  );

  return (
    <>
      <Text fontWeight={600} fontSize="15px">
        {t("People:UserStatus")}
      </Text>
      <Selectors>{StatusBadgeElements}</Selectors>
    </>
  );
};

export default inject(({ webhooksStore }) => {
  const {} = webhooksStore;

  return {};
})(observer(StatusPicker));

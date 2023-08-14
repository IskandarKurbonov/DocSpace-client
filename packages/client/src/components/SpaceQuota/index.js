import React, { useState } from "react";
import { inject, observer } from "mobx-react";
import { useTranslation } from "react-i18next";

import { getConvertedQuota } from "@docspace/common/utils";
import Text from "@docspace/components/text";
import ComboBox from "@docspace/components/combobox";
import { StyledBody, StyledText } from "./StyledComponent";

const SpaceQuota = (props) => {
  const {
    hideColumns,
    isCustomQuota = false,
    isDisabledQuotaChange,
    quotaLimit = 0,
    usedQuota = 0,
    type,
    item,
    changeUserQuota,
  } = props;
  console.log("SpaceQuota render");
  const [action, setAction] = useState("no-quota");
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation(["Common"]);

  const successCallback = () => {
   
    setIsLoading(false);
  };

  const abortCallback = () => {
    setIsLoading(false);
  };

  const onChange = ({ action }) => {
    console.log("action", action, "type", type, "item", item);
    if (action === "change") {
      setIsLoading(true);

      if (type === "user") {
        changeUserQuota([item], successCallback, abortCallback);
      }

      return;
    }
    setAction(action);
  };

  const options = [
    {
      id: "info-account-quota_edit",
      key: "change-quota",
      label: "Change quota",
      action: "change",
    },
    {
      id: "info-account-quota_no-quota",
      key: "no-quota",
      label: "Disable quota",
      action: "no-quota",
    },
  ];

  if (isCustomQuota)
    options?.splice(1, 0, {
      id: "info-account-quota_no-quota",
      key: "default-quota",
      label: "Set to default",
      action: "default",
    });

  const usedSpace = getConvertedQuota(t, usedQuota);
  const spaceLimited = getConvertedQuota(t, quotaLimit);

  const displayFunction = () => {
    const option = options.find((elem) => elem.action === action);

    if (option.key === "no-quota") {
      option.label = "Unlimited";
      return option;
    }
    if (option.key === "change-quota") {
      option.label = spaceLimited;
      return option;
    }

    return option;
  };

  const selectedOption = displayFunction();

  console.log("selectedOption", selectedOption);
  if (isDisabledQuotaChange) {
    return (
      <StyledText fontWeight={600}>
        {usedSpace} / {spaceLimited}
      </StyledText>
    );
  }

  return (
    <StyledBody
      hideColumns={hideColumns}
      isDisabledQuotaChange={isDisabledQuotaChange}
    >
      <Text fontWeight={600}>{usedSpace} / </Text>

      <ComboBox
        selectedOption={selectedOption}
        options={options}
        onSelect={onChange}
        scaled={false}
        size="content"
        modernView
        isLoading={isLoading}
        manualWidth={"fit-content"}
      />
    </StyledBody>
  );
};

export default inject(({ dialogsStore, peopleStore }) => {
  const {
    setChangeQuotaDialogVisible,
    changeQuotaDialogVisible,
  } = dialogsStore;
  const { changeUserQuota } = peopleStore;

  return {
    setChangeQuotaDialogVisible,
    changeQuotaDialogVisible,
    changeUserQuota,
  };
})(observer(SpaceQuota));

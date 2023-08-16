import React from "react";
import { useTranslation } from "react-i18next";
import { isMobileOnly } from "react-device-detect";
import { inject, observer } from "mobx-react";

import Text from "@docspace/components/text";
import Badge from "@docspace/components/badge";

import { StyledBaseQuotaComponent } from "./StyledComponent";

import QuotaPerRoomComponent from "./sub-components/QuotaPerRoom";
import QuotaPerUserComponent from "./sub-components/QuotaPerUser";
import MobileQuotasComponent from "./sub-components/MobileQuotas";

const QuotasComponent = (props) => {
  const { t } = useTranslation("Settings");

  const { isItemQuotaAvailable } = props;

  return (
    <StyledBaseQuotaComponent>
      <div className="title-container">
        <Text fontSize="16px" fontWeight={700}>
          {t("Quotas")}
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
      <Text className="quotas_description">{t("QuotasDescription")}</Text>

      {isMobileOnly ? (
        <MobileQuotasComponent isDisabled={!isItemQuotaAvailable} />
      ) : (
        <>
          <QuotaPerRoomComponent isDisabled={!isItemQuotaAvailable} />
          <QuotaPerUserComponent isDisabled={!isItemQuotaAvailable} />
        </>
      )}
    </StyledBaseQuotaComponent>
  );
};

export default inject(({ auth }) => {
  const { currentQuotaStore } = auth;
  const { isItemQuotaAvailable } = currentQuotaStore;

  return {
    isItemQuotaAvailable,
  };
})(observer(QuotasComponent));

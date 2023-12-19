import { useState } from "react";
import { useTranslation } from "react-i18next";
import { inject, observer } from "mobx-react";

import Text from "@docspace/components/text";
import ToggleButton from "@docspace/components/toggle-button";
import toastr from "@docspace/components/toast/toastr";

import { StyledBaseQuotaComponent } from "../StyledComponent";
import QuotaForm from "../../../../../components/QuotaForm";

let timerId = null;
const QuotaPerItemComponent = (props) => {
  const {
    isDisabled,
    saveQuota,
    disableQuota,
    toggleLabel,
    formLabel,
    getTenantExtra,
    initialSize,
    isQuotaSet,
  } = props;

  const { t } = useTranslation("Settings");

  const [isToggleChecked, setIsToggleChecked] = useState(isQuotaSet);

  const [isLoading, setIsLoading] = useState(false);

  const onToggleChange = async (e) => {
    const { checked } = e.currentTarget;

    setIsToggleChecked(checked);

    if (checked) return;

    setIsLoading(true);

    await disableQuota();

    try {
      await getTenantExtra();
    } catch (e) {
      toastr.error(e);
    }

    setIsLoading(false);
  };

  const onSaveQuota = async (size) => {
    console.log("onSaveUserQuota", size);
    timerId = setTimeout(() => setIsLoading(true), 200);

    await saveQuota(size);

    try {
      await getTenantExtra();
    } catch (e) {
      toastr.error(e);
    }

    timerId && clearTimeout(timerId);
    timerId = null;

    setIsLoading(false);
  };

  const onCancel = () => {
    !isQuotaSet && setIsToggleChecked(false);
  };
  return (
    <StyledBaseQuotaComponent isDisabled={isDisabled}>
      <div className="toggle-container">
        <ToggleButton
          fontWeight={600}
          fontSize="14px"
          className="quotas_toggle-button"
          label={toggleLabel}
          onChange={onToggleChange}
          isChecked={isToggleChecked}
          isDisabled={isDisabled || isLoading}
        />
        <Text className="toggle_label" fontSize="12px">
          {t("SetDefaultUserQuota")}
        </Text>
        {isToggleChecked && (
          <QuotaForm
            isButtonsEnable
            label={formLabel}
            maxInputWidth={"214px"}
            isLoading={isLoading}
            isDisabled={isDisabled}
            onSave={onSaveQuota}
            onCancel={onCancel}
            initialSize={initialSize}
          />
        )}
      </div>
    </StyledBaseQuotaComponent>
  );
};

export default inject(({ auth }) => {
  const { currentQuotaStore, getTenantExtra } = auth;
  const { setUserQuota } = currentQuotaStore;
  const { isItemQuotaAvailable } = currentQuotaStore;

  return { setUserQuota, isDisabled: !isItemQuotaAvailable, getTenantExtra };
})(observer(QuotaPerItemComponent));

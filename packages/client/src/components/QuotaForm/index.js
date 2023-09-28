import { useState } from "react";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";

import { conversionToBytes } from "@docspace/common/utils";
import TextInput from "@docspace/components/text-input";
import ComboBox from "@docspace/components/combobox";
import SaveCancelButtons from "@docspace/components/save-cancel-buttons";
import Text from "@docspace/components/text";

import StyledBody from "./StyledComponent";
import Checkbox from "@docspace/components/checkbox";

const QuotaForm = ({
  isLoading,
  isDisabled,
  maxInputWidth,
  onSetQuotaBytesSize,
  initialSize = "",
  initialPower = 0,
  isError,
  isButtonsEnable = false,
  onSave,
  label,
  checkboxLabel,
  description,
}) => {
  const [size, setSize] = useState(initialSize);
  const [power, setPower] = useState(initialPower);
  const [hasError, setHasError] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const { t } = useTranslation(["Common"]);
  const options = [
    { key: 0, label: t("Common:Bytes") },
    { key: 1, label: t("Common:Kilobyte") },
    { key: 2, label: t("Common:Megabyte") },
    { key: 3, label: t("Common:Gigabyte") },
    { key: 4, label: t("Common:Terabyte") },
  ];

  const getConvertedSize = (value) => {
    return value.trim() !== "" ? conversionToBytes(value, power) : "";
  };
  const onChangeTextInput = (e) => {
    const { value, validity } = e.target;

    if (validity.valid) {
      const transmittedSize = getConvertedSize(value);

      onSetQuotaBytesSize && onSetQuotaBytesSize(transmittedSize);
      setSize(value);
    }
  };

  const onSelectComboBox = (option) => {
    const { key } = option;

    onSetQuotaBytesSize && onSetQuotaBytesSize(conversionToBytes(size, key));
    setPower(key);
  };

  const onChangeCheckbox = () => {
    const changeСheckbox = !isChecked;

    setIsChecked(changeСheckbox);

    const sizeValue = changeСheckbox ? -1 : getConvertedSize(size);

    onSetQuotaBytesSize && onSetQuotaBytesSize(sizeValue);
  };
  const isSizeError = () => {
    if (size.trim() === "") {
      setHasError(true);
      return true;
    }

    return false;
  };
  const onKeyDownInput = (e) => {
    if (e.keyCode === 13 || e.which === 13) {
      if (isButtonsEnable) {
        if (isSizeError()) return;

        onSaveClick();

        setHasError(false);

        return;
      }
    }
  };
  const onSaveClick = async () => {
    if (isSizeError()) return;

    onSave & onSave(conversionToBytes(size, power));

    setHasError(false);
  };

  const onCancelClick = () => {
    console.log("onCancel");
  };

  const isDisable = isLoading || isDisabled || isChecked;
  return (
    <StyledBody
      maxInputWidth={maxInputWidth}
      isLabel={!!label}
      isCheckbox={!!checkboxLabel}
    >
      {label && <Text fontWeight={600}>{label}</Text>}
      {description && (
        <Text fontSize="12px" className="quota_description">
          {description}
        </Text>
      )}
      <div className="quota-container">
        <TextInput
          className="quota_limit"
          isAutoFocussed={true}
          value={size}
          onChange={onChangeTextInput}
          isDisabled={isDisable}
          onKeyDown={onKeyDownInput}
          hasError={isError || hasError}
          pattern="[0-9]*"
          scale
          withBorder
        />
        <ComboBox
          className="quota_value"
          options={options}
          isDisabled={isDisable}
          selectedOption={options.find((elem) => elem.key === power)}
          size="content"
          onSelect={onSelectComboBox}
          showDisabledItems
          manualWidth={"fit-content"}
        />
      </div>
      {checkboxLabel && (
        <Checkbox
          label={checkboxLabel}
          isChecked={isChecked}
          onChange={onChangeCheckbox}
        />
      )}

      {isButtonsEnable && (
        <SaveCancelButtons
          isSaving={isLoading}
          onSaveClick={onSaveClick}
          onCancelClick={onCancelClick}
          saveButtonLabel={t("Common:SaveButton")}
          cancelButtonLabel={t("Common:CancelButton")}
          reminderTest={t("YouHaveUnsavedChanges")}
          displaySettings
          cancelEnable
          saveButtonDisabled={false}
          showReminder
        />
      )}
    </StyledBody>
  );
};

QuotaForm.propTypes = {
  maxInputWidth: PropTypes.string,
  isLoading: PropTypes.bool,
  isError: PropTypes.bool,
  isButtonsEnable: PropTypes.bool,
  onSetQuotaBytesSize: PropTypes.func,
  initialSize: PropTypes.string,
  initialPower: PropTypes.number,
};

export default QuotaForm;

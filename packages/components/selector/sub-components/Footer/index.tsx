import React from "react";

import Button from "../../../button";
import TextInput from "../../../text-input";
import Checkbox from "../../../checkbox";

import {
  StyledFooter,
  StyledComboBox,
  StyledButtonContainer,
  StyledNewNameContainer,
  StyledNewNameHeader,
} from "./StyledFooter";
import { FooterProps } from "./Footer.types";

const Footer = React.memo(
  ({
    isMultiSelect,
    acceptButtonLabel,
    selectedItemsCount,
    withCancelButton,
    cancelButtonLabel,
    withAccessRights,
    accessRights,
    selectedAccessRight,
    onAccept,
    disableAcceptButton,
    onCancel,
    onChangeAccessRights,

    withFooterInput,
    withFooterCheckbox,
    footerInputHeader,
    footerCheckboxLabel,
    currentFooterInputValue,
    setNewFooterInputValue,
    isFooterCheckboxChecked,
    setIsFooterCheckboxChecked,
    acceptButtonId,
    cancelButtonId,
  }: FooterProps) => {
    const label =
      selectedItemsCount && isMultiSelect
        ? `${acceptButtonLabel} (${selectedItemsCount})`
        : acceptButtonLabel;

    const onChangeFileName = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setNewFooterInputValue && setNewFooterInputValue(value);
    };

    const onChangeCheckbox = () => {
      setIsFooterCheckboxChecked &&
        setIsFooterCheckboxChecked((value: boolean) => !value);
    };

    return (
      <StyledFooter
        withFooterInput={withFooterInput}
        withFooterCheckbox={withFooterCheckbox}
        className="selector_footer"
      >
        {withFooterInput && (
          <StyledNewNameContainer>
            <StyledNewNameHeader
              lineHeight={"20px"}
              fontWeight={600}
              fontSize={"13px"}
            >
              {footerInputHeader}
            </StyledNewNameHeader>
            <TextInput
              className={"new-file-input"}
              value={currentFooterInputValue}
              scale
              onChange={onChangeFileName}
            />
            {withFooterCheckbox && (
              <Checkbox
                label={footerCheckboxLabel}
                isChecked={isFooterCheckboxChecked}
                onChange={onChangeCheckbox}
              />
            )}
          </StyledNewNameContainer>
        )}

        {withFooterCheckbox && !withFooterInput && (
          <Checkbox
            label={footerCheckboxLabel}
            isChecked={isFooterCheckboxChecked}
            onChange={onChangeCheckbox}
            className="selector_footer-checkbox"
          />
        )}

        <StyledButtonContainer>
          <Button
            // @ts-expect-error TS(2322): Type '{ id: string | undefined; className: string;... Remove this comment to see the full error message
            id={acceptButtonId}
            className={"button accept-button"}
            label={label}
            primary
            scale
            size={"normal"}
            isDisabled={disableAcceptButton}
            onClick={onAccept}
          />

          {withAccessRights && (
            <StyledComboBox
              onSelect={onChangeAccessRights}
              options={accessRights}
              size="content"
              scaled={false}
              manualWidth="fit-content"
              selectedOption={selectedAccessRight}
              showDisabledItems
              directionX={"right"}
              directionY={"top"}
              forceCloseClickOutside={true}
            />
          )}

          {withCancelButton && (
            <Button
              // @ts-expect-error TS(2322): Type '{ id: string | undefined; className: string;... Remove this comment to see the full error message
              id={cancelButtonId}
              className={"button cancel-button"}
              label={cancelButtonLabel}
              scale
              size={"normal"}
              onClick={onCancel}
            />
          )}
        </StyledButtonContainer>
      </StyledFooter>
    );
  }
);

export default Footer;

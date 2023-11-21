import React from "react";

import Text from "@docspace/components/text";
import InputBlock from "@docspace/components/input-block";
//@ts-ignore
import HelpButton from "@docspace/components/help-button";
//@ts-ignore
import SelectorAddButton from "@docspace/components/selector-add-button";
//@ts-ignore
import SelectedItem from "@docspace/components/selected-item";

import {
  StyledChipsContainer,
  StyledHeaderRow,
  StyledInputGroup,
  StyledInputRow,
} from "../ClientForm.styled";
import InputGroup from "./InputGroup";
import { WEBSITE_REGEXP } from "..";

interface MultiInputGroupProps {
  t: any;
  label: string;

  name: string;
  placeholder: string;
  currentValue: string[];

  onAdd: (name: string, value: string, remove?: boolean) => void;

  helpButtonText?: string;

  isDisabled?: boolean;
}

const MultiInputGroup = ({
  t,
  label,
  name,
  placeholder,
  currentValue,
  onAdd,

  helpButtonText,
  isDisabled,
}: MultiInputGroupProps) => {
  const [value, setValue] = React.useState("");
  const timer = React.useRef<null | ReturnType<typeof setTimeout>>(null);
  const [isError, setIsError] = React.useState(false);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    setValue(value);
  };

  React.useEffect(() => {
    if (timer.current) {
      clearTimeout(timer.current);
    }
    console.log(value, "call");
    if (value) {
      console.log(value);
      if (WEBSITE_REGEXP.test(value)) {
        setIsError(false);
      } else {
        timer.current = setTimeout(() => {
          setIsError(true);
        }, 300);
      }
    } else {
      setIsError(false);
    }
  }, [value]);

  console.log(WEBSITE_REGEXP.test(value));
  return (
    <StyledInputGroup>
      <InputGroup
        label={label}
        helpButtonText={helpButtonText}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        error={t("ErrorWrongURL")}
        isRequired
        isError={isError}
      >
        <StyledInputRow>
          <InputBlock
            name={name}
            value={value}
            placeholder={placeholder}
            onChange={onChange}
            scale
            tabIndex={0}
            maxLength={255}
            isDisabled={isDisabled}
          />
          <SelectorAddButton
            onClick={() => {
              if (isDisabled || isError) return;
              onAdd(name, value);
              setValue("");
            }}
            isDisabled={isDisabled || isError}
          />
        </StyledInputRow>
      </InputGroup>

      <StyledChipsContainer>
        {currentValue.map((v, index) => (
          <SelectedItem
            key={`${v}-${index}`}
            isInline
            label={v}
            onClose={() => {
              !isDisabled && onAdd(name, v);
            }}
          />
        ))}
      </StyledChipsContainer>
    </StyledInputGroup>
  );
};

export default MultiInputGroup;

import React from "react";

import Text from "@docspace/components/text";

import ToggleButton from "@docspace/components/toggle-button";

import { isMobileOnly } from "react-device-detect";

import {
  StyledRowContent,
  ContentWrapper,
  FlexWrapper,
  ToggleButtonWrapper,
} from "./RowView.styled";
import { RowContentProps } from "./RowView.types";

export const RowContent = ({
  sectionWidth,
  item,

  handleToggleEnabled,
}: RowContentProps) => {
  return (
    <StyledRowContent sectionWidth={sectionWidth}>
      <ContentWrapper>
        <FlexWrapper>
          {/* @ts-ignore */}
          <Text
            fontWeight={600}
            fontSize="14px"
            style={{ marginInlineEnd: "8px" }}
          >
            {item.name}
          </Text>
        </FlexWrapper>

        {!isMobileOnly && (
          <>
            {/* @ts-ignore */}
            <Text fontWeight={600} fontSize="12px" color="#A3A9AE">
              {item.description}
            </Text>
          </>
        )}
      </ContentWrapper>

      <ToggleButtonWrapper>
        <ToggleButton
          className="toggle toggleButton"
          id="toggle id"
          isChecked={item.enabled}
          onChange={handleToggleEnabled}
        />
      </ToggleButtonWrapper>
    </StyledRowContent>
  );
};

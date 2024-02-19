import CrossReactSvg from "PUBLIC_DIR/images/cross.react.svg?url";

import React from "react";
import { Text as TextComponent } from "../text";
import { Link as LinkComponent } from "../link";
import { IconButton } from "../icon-button";

import {
  BannerWrapper,
  BannerContent,
  BannerButton,
} from "./CampaignsBanner.styled";
import { CampaignsBannerProps } from "./CampaignsBanner.types";

const CampaignsBanner = (props: CampaignsBannerProps) => {
  const {
    campaignImage,
    campaignTranslate,
    campaignConfig,
    onAction,
    onClose,
  } = props;
  const { Header, SubHeader, Text, ButtonLabel, Link } = campaignTranslate;
  const { borderColor, title, body, text, action } = campaignConfig;

  const hasTitle = !!Header;
  const hasBodyText = !!SubHeader;
  const hasText = !!Text;
  const isButton = action?.isButton;

  return (
    <BannerWrapper
      data-testid="campaigns-banner"
      background={campaignImage}
      borderColor={borderColor}
    >
      <BannerContent>
        {hasTitle && (
          <TextComponent
            color={title?.color}
            fontSize={title?.fontSize}
            fontWeight={title?.fontWeight}
          >
            {Header}
          </TextComponent>
        )}
        {hasBodyText && (
          <TextComponent
            color={body?.color}
            fontSize={body?.fontSize}
            fontWeight={body?.fontWeight}
          >
            {SubHeader}
          </TextComponent>
        )}
        {hasText && (
          <TextComponent
            color={text?.color}
            fontSize={text?.fontSize}
            fontWeight={text?.fontWeight}
          >
            {Text}
          </TextComponent>
        )}

        {isButton ? (
          <BannerButton
            buttonTextColor={action?.color}
            buttonColor={action?.backgroundColor}
            onClick={() => onAction(action?.type, Link)}
          >
            {ButtonLabel}
          </BannerButton>
        ) : (
          <LinkComponent
            color={action?.color}
            fontSize={action?.fontSize}
            fontWeight={action?.fontWeight}
            onClick={() => onAction(action?.type, Link)}
          >
            {ButtonLabel}
          </LinkComponent>
        )}
      </BannerContent>
      <IconButton
        className="close-icon"
        size={12}
        iconName={CrossReactSvg}
        onClick={onClose}
      />
    </BannerWrapper>
  );
};

export { CampaignsBanner };

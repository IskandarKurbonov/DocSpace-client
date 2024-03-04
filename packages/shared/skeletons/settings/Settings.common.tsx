import React from "react";
import { LOADER_STYLE } from "@docspace/shared/constants";
import { RectangleSkeleton } from "@docspace/shared/skeletons";
import { Box } from "@docspace/shared/components/box";
import {
  SectionTitleProps,
  SettingProps,
  SettingsSectionProps,
} from "./Settings.types";

const speed = 2;
const heightText = "20px";
const heightRadio = "16px";
const sectionGap = "12px";
const sectionsGap = "12px";

const Setting = ({ width = "280px" }: SettingProps) => (
  <Box
    displayProp="grid"
    style={{
      gridGap: "8px",
      gridTemplateColumns: `28px ${width}`,
      alignItems: "center",
    }}
  >
    <RectangleSkeleton
      height={heightRadio}
      backgroundColor={LOADER_STYLE.backgroundColor}
      foregroundColor={LOADER_STYLE.foregroundColor}
      backgroundOpacity={LOADER_STYLE.backgroundOpacity}
      foregroundOpacity={LOADER_STYLE.foregroundOpacity}
      speed={speed}
      animate
    />
    <RectangleSkeleton
      height={heightText}
      backgroundColor={LOADER_STYLE.backgroundColor}
      foregroundColor={LOADER_STYLE.foregroundColor}
      backgroundOpacity={LOADER_STYLE.backgroundOpacity}
      foregroundOpacity={LOADER_STYLE.foregroundOpacity}
      speed={speed}
      animate
    />
  </Box>
);

const SectionTitle = ({ height = "16", width = "62" }: SectionTitleProps) => (
  <RectangleSkeleton
    height={height}
    width={width}
    backgroundColor={LOADER_STYLE.backgroundColor}
    foregroundColor={LOADER_STYLE.foregroundColor}
    backgroundOpacity={LOADER_STYLE.backgroundOpacity}
    foregroundOpacity={LOADER_STYLE.foregroundOpacity}
    speed={speed}
    animate
  />
);

const SettingsSection = ({
  width1,
  width2,
  withTitle = true,
}: SettingsSectionProps) => (
  <Box displayProp="grid" style={{ gridGap: sectionGap }}>
    {withTitle && <SectionTitle />}
    <Setting width={width1} />
    <Setting width={width2} />
  </Box>
);

// const SettingsTabs = () => (
//   <Box
//     displayProp="grid"
//     style={{
//       gridGap: "20px",
//       gridTemplateColumns: "41px 58px",
//     }}
//   >
//     <RectangleSkeleton
//       height="32"
//       backgroundColor={LOADER_STYLE.backgroundColor}
//       foregroundColor={LOADER_STYLE.foregroundColor}
//       backgroundOpacity={LOADER_STYLE.backgroundOpacity}
//       foregroundOpacity={LOADER_STYLE.foregroundOpacity}
//       speed={speed}
//       animate
//     />
//     <RectangleSkeleton
//       height="32"
//       backgroundColor={LOADER_STYLE.backgroundColor}
//       foregroundColor={LOADER_STYLE.foregroundColor}
//       backgroundOpacity={LOADER_STYLE.backgroundOpacity}
//       foregroundOpacity={LOADER_STYLE.foregroundOpacity}
//       speed={speed}
//       animate
//     />
//   </Box>
// );

export const SettingsCommonSkeleton = () => (
  <Box
    widthProp="100%"
    heightProp="100%"
    displayProp="grid"
    style={{ gridGap: sectionsGap }}
  >
    <SettingsSection width1="225px" width2="281px" withTitle={false} />
    <SettingsSection width1="324px" width2="351px" withTitle={false} />
  </Box>
);
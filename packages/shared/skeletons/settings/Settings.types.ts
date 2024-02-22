import type { RectangleSkeletonProps } from "../rectangle";

export interface SettingProps {
  width?: string;
}
export interface SectionTitleProps extends SettingProps {
  height?: string;
}

export interface SettingsSectionProps {
  width1: string;
  width2: string;
  withTitle?: boolean;
}

export interface SettingsStorageManagementSkeletonProps
  extends RectangleSkeletonProps {}

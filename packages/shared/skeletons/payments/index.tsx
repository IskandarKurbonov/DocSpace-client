import React from "react";
import { RectangleSkeleton } from "../rectangle";

import { StyledPaymentsLoader } from "./Payments.styled";
import type { PaymentsLoaderProps } from "./Payments.types";

export { PaymentsStandaloneLoader } from "./Payments.standalone";

const PaymentsLoader = (props: PaymentsLoaderProps) => {
  const {
    title,
    borderRadius,
    backgroundColor,
    foregroundColor,
    backgroundOpacity,
    foregroundOpacity,
    speed,
    animate,
  } = props;

  return (
    <StyledPaymentsLoader>
      <RectangleSkeleton
        className="payments-loader_title"
        title={title}
        width="163"
        height="100%"
        borderRadius={borderRadius}
        backgroundColor={backgroundColor}
        foregroundColor={foregroundColor}
        backgroundOpacity={backgroundOpacity}
        foregroundOpacity={foregroundOpacity}
        speed={speed}
        animate={animate}
      />
      <div>
        <RectangleSkeleton
          title={title}
          width="248"
          height="22"
          borderRadius={borderRadius}
          backgroundColor={backgroundColor}
          foregroundColor={foregroundColor}
          backgroundOpacity={backgroundOpacity}
          foregroundOpacity={foregroundOpacity}
          speed={speed}
          animate={animate}
        />
      </div>
      <div>
        <RectangleSkeleton
          className="payments-loader_description"
          title={title}
          width="100%"
          height="100%"
          borderRadius={borderRadius}
          backgroundColor={backgroundColor}
          foregroundColor={foregroundColor}
          backgroundOpacity={backgroundOpacity}
          foregroundOpacity={foregroundOpacity}
          speed={speed}
          animate={animate}
        />
      </div>
      <div>
        <RectangleSkeleton
          title={title}
          width="222"
          height="22"
          borderRadius={borderRadius}
          backgroundColor={backgroundColor}
          foregroundColor={foregroundColor}
          backgroundOpacity={backgroundOpacity}
          foregroundOpacity={foregroundOpacity}
          speed={speed}
          animate={animate}
        />
      </div>
      <div>
        <RectangleSkeleton
          className="payments-loader_plan-description"
          title={title}
          width="222"
          height="16"
          borderRadius={borderRadius}
          backgroundColor={backgroundColor}
          foregroundColor={foregroundColor}
          backgroundOpacity={backgroundOpacity}
          foregroundOpacity={foregroundOpacity}
          speed={speed}
          animate={animate}
        />
      </div>
      <div className="payments-loader_main">
        <RectangleSkeleton
          title={title}
          width="100%"
          height="100%"
          borderRadius={borderRadius}
          backgroundColor={backgroundColor}
          foregroundColor={foregroundColor}
          backgroundOpacity={backgroundOpacity}
          foregroundOpacity={foregroundOpacity}
          speed={speed}
          animate={animate}
        />
        <RectangleSkeleton
          title={title}
          width="100%"
          height="100%"
          borderRadius={borderRadius}
          backgroundColor={backgroundColor}
          foregroundColor={foregroundColor}
          backgroundOpacity={backgroundOpacity}
          foregroundOpacity={foregroundOpacity}
          speed={speed}
          animate={animate}
        />
      </div>
      <div>
        <RectangleSkeleton
          className="payments-loader_plan-description"
          title={title}
          width="222"
          height="16"
          borderRadius={borderRadius}
          backgroundColor={backgroundColor}
          foregroundColor={foregroundColor}
          backgroundOpacity={backgroundOpacity}
          foregroundOpacity={foregroundOpacity}
          speed={speed}
          animate={animate}
        />
      </div>
    </StyledPaymentsLoader>
  );
};

export default PaymentsLoader;
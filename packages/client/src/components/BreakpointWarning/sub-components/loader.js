import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Loaders from "@docspace/common/components/Loaders";

import { getCorrectFourValuesStyle } from "@docspace/components/utils/rtlUtils";
import { isMobile } from "@docspace/components/utils/device";

const StyledLoader = styled.div`
  padding-top: 25px;

  ${({ theme }) =>
    theme.interfaceDirection === "rtl"
      ? `padding-right: 32px;`
      : `padding-left: 32px;`}
  display: flex;
  flex-direction: column;

  .img {
    padding-bottom: 32px;
  }

  .loader-description {
    display: flex;
    flex-direction: column;
  }

  .loader-text {
    padding-top: 8px;
  }

  .block {
    display: block;
  }

  @media (min-width: 600px) {
    flex-direction: row;
    padding: ${({ theme }) =>
      getCorrectFourValuesStyle("65px 0 0 104px", theme.interfaceDirection)};

    .loader-description {
      padding: ${({ theme }) =>
        getCorrectFourValuesStyle("0 0 0 32px", theme.interfaceDirection)};
    }
  }
`;

const Loader = () => {
  const [viewMobile, setViewMobile] = useState(false);

  useEffect(() => {
    onCheckView();
    window.addEventListener("resize", onCheckView);

    return () => window.removeEventListener("resize", onCheckView);
  }, []);

  const onCheckView = () => {
    if (isMobile()) {
      setViewMobile(true);
    } else {
      setViewMobile(false);
    }
  };

  return (
    <StyledLoader>
      <Loaders.Rectangle
        height={viewMobile ? "72px" : "100px"}
        width={viewMobile ? "72px" : "100px"}
        className="img block"
      />

      <div className="loader-description">
        <Loaders.Rectangle
          height="44px"
          width={viewMobile ? "287px" : "332px"}
          className="block"
        />
        <Loaders.Rectangle
          height={viewMobile ? "32px" : "16px"}
          width={viewMobile ? "287px" : "332px"}
          className="loader-text block"
        />
      </div>
    </StyledLoader>
  );
};

export default Loader;

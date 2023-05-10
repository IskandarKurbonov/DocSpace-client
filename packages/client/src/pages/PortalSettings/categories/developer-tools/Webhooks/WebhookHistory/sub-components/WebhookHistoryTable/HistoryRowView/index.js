import React, { useEffect } from "react";
import styled from "styled-components";
import { inject, observer } from "mobx-react";

import { isMobile } from "react-device-detect";

import RowContainer from "@docspace/components/row-container";
import HistoryRow from "./HistoryRow";

const StyledRowContainer = styled(RowContainer)`
  margin-top: 11px;
`;

const HistoryRowView = (props) => {
  const { historyWebhooks, sectionWidth, viewAs, setViewAs } = props;

  useEffect(() => {
    if (viewAs !== "table" && viewAs !== "row") return;

    if (sectionWidth < 1025 || isMobile) {
      viewAs !== "row" && setViewAs("row");
    } else {
      viewAs !== "table" && setViewAs("table");
    }
  }, [sectionWidth]);

  return (
    <StyledRowContainer useReactWindow={false}>
      {historyWebhooks.map((item) => (
        <HistoryRow key={item.id} historyItem={item} sectionWidth={sectionWidth} />
      ))}
    </StyledRowContainer>
  );
};

export default inject(({ setup }) => {
  const { viewAs, setViewAs } = setup;

  return {
    viewAs,
    setViewAs,
  };
})(observer(HistoryRowView));

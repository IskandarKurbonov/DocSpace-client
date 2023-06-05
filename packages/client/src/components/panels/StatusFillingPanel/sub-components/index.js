import { ReactSVG } from "react-svg";
import { mockData } from "./mockData.js";
import { FillingStatusContainer } from "./StyledFillingStatusLine";
import FillingStatusAccordion from "./FillingStatusAccordion";
import StatusDoneReactSvgUrl from "PUBLIC_DIR/images/done.react.svg?url";
import StatusInterruptedSvgUrl from "PUBLIC_DIR/images/interrupted.react.svg?url";

import Text from "@docspace/components/text";
import Box from "@docspace/components/box";

const FillingStatusLine = ({ statusDone, statusInterrupted }) => {
  return (
    <FillingStatusContainer
      isDone={statusDone}
      isInterrupted={statusInterrupted}
    >
      {mockData.map((data) => {
        return (
          <FillingStatusAccordion
            key={data.id}
            displayName={data.displayName}
            avatar={data.avatar}
            role={data.role}
            startFilling={data.startFillingStatus}
            startFillingDate={data.startFillingDate}
            filledAndSigned={data.filledAndSignedStatus}
            filledAndSignedDate={data.filledAndSignedDate}
            returnedByUser={data.returnedByUser}
            returnedDate={data.returnedByUserDate}
            comment={data.comment}
            isDone={statusDone}
            isInterrupted={statusInterrupted}
          />
        );
      })}

      {statusInterrupted ? (
        <Box displayProp="flex" alignItems="center" marginProp="15px 0 0">
          <ReactSVG
            src={StatusInterruptedSvgUrl}
            className="status-interrupted-icon"
          />
          <Text className="status-interrupted-text">Interrupted</Text>
        </Box>
      ) : (
        <Box displayProp="flex" alignItems="center" marginProp="15px 0 0">
          <ReactSVG src={StatusDoneReactSvgUrl} className="status-done-icon" />
          <Text className="status-done-text">Done</Text>
        </Box>
      )}
    </FillingStatusContainer>
  );
};

FillingStatusLine.defaultProps = {
  statusDone: false,
  statusInterrupted: false,
};

export default FillingStatusLine;
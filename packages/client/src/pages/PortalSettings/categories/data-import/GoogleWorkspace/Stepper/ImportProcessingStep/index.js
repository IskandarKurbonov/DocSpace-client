import { useState, useRef, useEffect } from "react";
import { CancelUploadDialog } from "SRC_DIR/components/dialogs";
import { tablet } from "@docspace/components/utils/device";
import styled from "styled-components";

import SaveCancelButtons from "@docspace/components/save-cancel-buttons";
import ProgressBar from "@docspace/components/progress-bar";
import Button from "@docspace/components/button";

const Wrapper = styled.div`
  max-width: 350px;

  @media ${tablet} {
    .cancel-button {
      width: 100px;
      height: 40px;
      font-size: 14px;
    }
  }

  .data-import-progress-bar {
    margin-top: -8px;
    margin-bottom: 16px;
  }
`;

const ImportProcessingStep = ({
  t,
  onNextStep,
  onPrevStep,
  showReminder,
  isFifthStep,
}) => {
  const [isVisble, setIsVisble] = useState(false);
  const [percent, setPercent] = useState(0);
  const percentRef = useRef(0);

  const PERCENT_STEP = 5;

  useEffect(() => {
    const interval = setInterval(() => {
      if (percentRef.current < 100) {
        setPercent((prevPercent) => prevPercent + PERCENT_STEP);
        percentRef.current += PERCENT_STEP;
      } else {
        clearInterval(interval);
        onNextStep();
      }
    }, 200);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const onClickButton = () => {
    setIsVisble(true);
  };

  return (
    <Wrapper>
      {percent < 102 ? (
        <>
          <ProgressBar percent={percent} className="data-import-progress-bar" />
          <Button
            size="small"
            className="cancel-button"
            label={t("Common:CancelButton")}
            onClick={onClickButton}
          />
        </>
      ) : (
        <SaveCancelButtons
          className="save-cancel-buttons"
          onSaveClick={onNextStep}
          onCancelClick={onPrevStep}
          showReminder={showReminder}
          saveButtonLabel={t("Settings:NextStep")}
          cancelButtonLabel={t("Common:Back")}
          displaySettings={true}
        />
      )}

      {isVisble && (
        <CancelUploadDialog
          visible={isVisble}
          loading={false}
          isFifthStep={isFifthStep}
          onClose={() => setIsVisble(false)}
        />
      )}
    </Wrapper>
  );
};

export default ImportProcessingStep;

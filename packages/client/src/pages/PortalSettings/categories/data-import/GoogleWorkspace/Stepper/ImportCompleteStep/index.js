// (c) Copyright Ascensio System SIA 2009-2024
//
// This program is a free software product.
// You can redistribute it and/or modify it under the terms
// of the GNU Affero General Public License (AGPL) version 3 as published by the Free Software
// Foundation. In accordance with Section 7(a) of the GNU AGPL its Section 15 shall be amended
// to the effect that Ascensio System SIA expressly excludes the warranty of non-infringement of
// any third-party rights.
//
// This program is distributed WITHOUT ANY WARRANTY, without even the implied warranty
// of MERCHANTABILITY or FITNESS FOR A PARTICULAR  PURPOSE. For details, see
// the GNU AGPL at: http://www.gnu.org/licenses/agpl-3.0.html
//
// You can contact Ascensio System SIA at Lubanas st. 125a-25, Riga, Latvia, EU, LV-1021.
//
// The  interactive user interfaces in modified source and object code versions of the Program must
// display Appropriate Legal Notices, as required under Section 5 of the GNU AGPL version 3.
//
// Pursuant to Section 7(b) of the License you must retain the original Product logo when
// distributing the program. Pursuant to Section 7(e) we decline to grant you any rights under
// trademark law for use of our trademarks.
//
// All the Product's GUI elements, including illustrations and icon sets, as well as technical writing
// content are licensed under the terms of the Creative Commons Attribution-ShareAlike 4.0
// International. See the License terms at http://creativecommons.org/licenses/by-sa/4.0/legalcode

import { useState, useEffect } from "react";
import { inject, observer } from "mobx-react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { SaveCancelButtons } from "@docspace/shared/components/save-cancel-buttons";
import { Text } from "@docspace/shared/components/text";
import { Checkbox } from "@docspace/shared/components/checkbox";
import { HelpButton } from "@docspace/shared/components/help-button";
import { toastr } from "@docspace/shared/components/toast";

const Wrapper = styled.div`
  margin: 0 0 16px;
  display: flex;
  align-items: center;

  .checkbox-text {
    color: ${(props) => props.theme.client.settings.migration.subtitleColor};
  }
`;

const InfoText = styled(Text)`
  margin-top: -8px;
  margin-bottom: 16px;
  font-size: 12px;
  color: ${(props) => props.theme.client.settings.migration.subtitleColor};
`;

const ErrorText = styled(Text)`
  font-size: 12px;
  color: ${(props) => props.theme.client.settings.migration.errorTextColor};
  margin-bottom: 16px;
`;

const ImportCompleteStep = ({
  t,
  getMigrationLog,
  clearCheckedAccounts,
  sendWelcomeLetter,
  clearMigration,
  getMigrationStatus,
}) => {
  const [isChecked, setIsChecked] = useState(false);
  const [importResult, setImportResult] = useState({
    succeedUsers: 0,
    failedUsers: 0,
  });
  const navigate = useNavigate();

  const [isSaving, setIsSaving] = useState(false);

  const onDownloadLog = async () => {
    try {
      await getMigrationLog()
        .then((response) => new Blob([response]))
        .then((blob) => {
          let a = document.createElement("a");
          const url = window.URL.createObjectURL(blob);
          a.href = url;
          a.download = "migration.log";
          a.click();
          window.URL.revokeObjectURL(url);
        });
    } catch (error) {
      console.log(error);
      toastr.error(error);
    }
  };

  const onChangeCheckbox = () => {
    setIsChecked((prev) => !prev);
  };

  const onFinishClick = () => {
    if (isChecked) {
      sendWelcomeLetter({ isSendWelcomeEmail: true });
    }
    clearCheckedAccounts();
    clearMigration();
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      navigate(-1);
    }, 1000);
  };

  useEffect(() => {
    try {
      getMigrationStatus().then((res) =>
        setImportResult({
          succeedUsers: res.parseResult.successedUsers,
          failedUsers: res.parseResult.failedUsers,
        }),
      );
    } catch (error) {
      toastr.error(error);
    }
  }, []);

  return (
    <>
      <InfoText>
        {t("Settings:ImportedUsers", {
          selectedUsers: importResult.succeedUsers,
          importedUsers: importResult.succeedUsers + importResult.failedUsers,
        })}
      </InfoText>

      {importResult.failedUsers > 0 && (
        <ErrorText>
          {t("Settings:ErrorsWereFound", {
            errors: importResult.failedUsers,
          })}
        </ErrorText>
      )}

      <Wrapper>
        <Checkbox
          label={t("Settings:SendWelcomeLetter")}
          isChecked={isChecked}
          onChange={onChangeCheckbox}
        />
        <HelpButton
          place="right"
          offsetRight={0}
          style={{ margin: "0px 5px" }}
          tooltipContent={
            <Text fontSize="12px">{t("Settings:WelcomeLetterTooltip")}</Text>
          }
        />
      </Wrapper>

      <SaveCancelButtons
        className="save-cancel-buttons"
        onSaveClick={onFinishClick}
        onCancelClick={onDownloadLog}
        saveButtonLabel={t("Common:Finish")}
        cancelButtonLabel={t("Settings:DownloadLog")}
        displaySettings
        showReminder
        isSaving={isSaving}
      />
    </>
  );
};

export default inject(({ importAccountsStore }) => {
  const {
    getMigrationLog,
    clearCheckedAccounts,
    sendWelcomeLetter,
    clearMigration,
    getMigrationStatus,
  } = importAccountsStore;

  return {
    getMigrationLog,
    clearCheckedAccounts,
    sendWelcomeLetter,
    clearMigration,
    getMigrationStatus,
  };
})(observer(ImportCompleteStep));

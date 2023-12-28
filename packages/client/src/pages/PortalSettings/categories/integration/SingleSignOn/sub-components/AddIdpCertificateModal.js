import React from "react";
import { inject, observer } from "mobx-react";
import { useTranslation } from "react-i18next";

import { Button } from "@docspace/shared/components";
import { ModalDialog } from "@docspace/shared/components";
import StyledModalDialog from "../styled-containers/StyledModalDialog";
import { Text } from "@docspace/shared/components";
import { Textarea } from "@docspace/shared/components";

const AddIdpCertificateModal = (props) => {
  const { t } = useTranslation(["SingleSignOn", "Common"]);
  const {
    closeIdpModal,
    addIdpCertificate,
    idpIsModalVisible,
    setInput,
    idpCertificate,
    isCertificateLoading,
  } = props;

  return (
    <StyledModalDialog
      autoMaxHeight
      autoMaxWidth
      displayType="modal"
      onClose={closeIdpModal}
      visible={idpIsModalVisible}
    >
      <ModalDialog.Header>{t("NewCertificate")}</ModalDialog.Header>

      <ModalDialog.Body>
        <Text isBold className="text-area-label" noSelect>
          {t("OpenCertificate")}
        </Text>

        <Textarea
          className="text-area"
          id="idp-certificate"
          name="idpCertificate"
          onChange={setInput}
          value={idpCertificate}
          placeholder={t("PlaceholderCert")}
        />
      </ModalDialog.Body>

      <ModalDialog.Footer>
        <Button
          id="ok-button"
          label={t("Common:OKButton")}
          onClick={() => addIdpCertificate(t)}
          primary
          scale
          isLoading={isCertificateLoading}
          isDisabled={!idpCertificate}
          size="normal"
        />
        <Button
          id="cancel-button"
          label={t("Common:CancelButton")}
          onClick={closeIdpModal}
          size="normal"
          scale
          isDisabled={isCertificateLoading}
        />
      </ModalDialog.Footer>
    </StyledModalDialog>
  );
};

export default inject(({ ssoStore }) => {
  const {
    closeIdpModal,
    addIdpCertificate,
    idpIsModalVisible,
    setInput,
    idpCertificate,
    isCertificateLoading,
  } = ssoStore;

  return {
    closeIdpModal,
    addIdpCertificate,
    idpIsModalVisible,
    setInput,
    idpCertificate,
    isCertificateLoading,
  };
})(observer(AddIdpCertificateModal));

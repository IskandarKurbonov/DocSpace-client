import React from "react";
import { inject, observer } from "mobx-react";

import { EmployeeType, EmployeeStatus } from "@docspace/common/constants";

import {
  ChangeEmailDialog,
  ChangePasswordDialog,
  ChangePortalOwnerDialog,
  DeleteSelfProfileDialog,
  DeleteProfileEverDialog,
  ChangeUserTypeDialog,
  ChangeUserStatusDialog,
  SendInviteDialog,
  DeleteUsersDialog,
  InviteDialog,
  ChangeNameDialog,
} from "SRC_DIR/components/dialogs";

const Dialogs = ({
  changeEmail,
  changePassword,
  changeOwner,
  deleteSelfProfile,
  deleteProfileEver,
  data,
  closeDialogs,
  employeeDialogVisible,
  guestDialogVisible,
  activeDialogVisible,
  disableDialogVisible,
  sendInviteDialogVisible,
  deleteDialogVisible,
  invitationDialogVisible,

  changeNameVisible,
  setChangeNameVisible,
  profile,
}) => {
  return (
    <>
      {changeEmail && (
        <ChangeEmailDialog
          visible={changeEmail}
          onClose={closeDialogs}
          user={data}
        />
      )}
      {changePassword && (
        <ChangePasswordDialog
          visible={changePassword}
          onClose={closeDialogs}
          email={data.email}
        />
      )}
      {changeOwner && (
        <ChangePortalOwnerDialog visible={changeOwner} onClose={closeDialogs} />
      )}
      {deleteSelfProfile && (
        <DeleteSelfProfileDialog
          visible={deleteSelfProfile}
          onClose={closeDialogs}
          email={data.email}
        />
      )}
      {deleteProfileEver && (
        <DeleteProfileEverDialog
          visible={deleteProfileEver}
          onClose={closeDialogs}
          user={data}
        />
      )}
      {employeeDialogVisible && (
        <ChangeUserTypeDialog
          visible={employeeDialogVisible}
          onClose={closeDialogs}
          userType={EmployeeType.User}
        />
      )}
      {guestDialogVisible && (
        <ChangeUserTypeDialog
          visible={guestDialogVisible}
          onClose={closeDialogs}
          userType={EmployeeType.Guest}
        />
      )}
      {activeDialogVisible && (
        <ChangeUserStatusDialog
          visible={activeDialogVisible}
          onClose={closeDialogs}
          userStatus={EmployeeStatus.Active}
        />
      )}
      {disableDialogVisible && (
        <ChangeUserStatusDialog
          visible={disableDialogVisible}
          onClose={closeDialogs}
          userStatus={EmployeeStatus.Disabled}
        />
      )}
      {sendInviteDialogVisible && (
        <SendInviteDialog
          visible={sendInviteDialogVisible}
          onClose={closeDialogs}
        />
      )}

      {deleteDialogVisible && (
        <DeleteUsersDialog
          visible={deleteDialogVisible}
          onClose={closeDialogs}
        />
      )}
      {invitationDialogVisible && (
        <InviteDialog
          visible={invitationDialogVisible}
          onClose={closeDialogs}
          onCloseButton={closeDialogs}
        />
      )}
      {changeNameVisible && (
        <ChangeNameDialog
          visible={changeNameVisible}
          onClose={() => setChangeNameVisible(false)}
          profile={profile}
          fromList
        />
      )}
    </>
  );
};

export default inject(({ auth, peopleStore }) => {
  const {
    changeEmail,
    changePassword,
    changeOwner,
    deleteSelfProfile,
    deleteProfileEver,
    data,
    closeDialogs,

    employeeDialogVisible,
    guestDialogVisible,
    activeDialogVisible,
    disableDialogVisible,
    sendInviteDialogVisible,
    deleteDialogVisible,
    invitationDialogVisible,
  } = peopleStore.dialogStore;

  const { user: profile } = auth.userStore;

  const {
    changeNameVisible,
    setChangeNameVisible,
  } = peopleStore.targetUserStore;

  return {
    changeEmail,
    changePassword,
    changeOwner,
    deleteSelfProfile,
    deleteProfileEver,
    data,
    closeDialogs,

    employeeDialogVisible,
    guestDialogVisible,
    activeDialogVisible,
    disableDialogVisible,
    sendInviteDialogVisible,
    deleteDialogVisible,
    invitationDialogVisible,

    changeNameVisible,
    setChangeNameVisible,
    profile,
  };
})(observer(Dialogs));

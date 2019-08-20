import React, { memo } from "react";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";
import {
  ContentRow,
  toastr,
  CustomScrollbarsVirtualList,
  EmptyScreenContainer,
  Icons,
  Link
} from "asc-web-components";
import UserContent from "./userContent";
import {
  selectUser,
  deselectUser,
  setSelection,
  fetchPeople,
  updateUserStatus
} from "../../../../../store/people/actions";
import {
  isUserSelected,
  getUserStatus,
  getUserRole
} from "../../../../../store/people/selectors";
import { isAdmin, isMe } from "../../../../../store/auth/selectors";
import { FixedSizeList as List, areEqual } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import { EmployeeStatus } from "../../../../../helpers/constants";

const Row = memo(
  ({
    data,
    index,
    style,
    onContentRowSelect,
    history,
    settings,
    selection,
    viewer,
    getUserContextOptions
  }) => {
    // Data passed to List as "itemData" is available as props.data
    const user = data[index];
    const contextOptions = getUserContextOptions(user, viewer);
    const contextOptionsProps = !contextOptions.length
      ? {}
      : { contextOptions };
    const checked = isUserSelected(selection, user.id);
    const checkedProps = isAdmin(viewer) ? { checked } : {};

    return (
      <ContentRow
        key={user.id}
        status={getUserStatus(user)}
        data={user}
        avatarRole={getUserRole(user)}
        avatarSource={user.avatar}
        avatarName={user.displayName}
        onSelect={onContentRowSelect}
        style={style}
        {...checkedProps}
        {...contextOptionsProps}
      >
        <UserContent user={user} history={history} settings={settings} />
      </ContentRow>
    );
  },
  areEqual
);

class SectionBodyContent extends React.PureComponent {
  onEmailSentClick = () => {
    toastr.success("Context action: Send e-mail");
  };

  onSendMessageClick = () => {
    toastr.success("Context action: Send message");
  };

  onEditClick = user => {
    const { history, settings } = this.props;
    history.push(`${settings.homepage}/edit/${user.userName}`);
  };

  onChangePasswordClick = () => {
    toastr.success("Context action: Change password");
  };

  onChangeEmailClick = () => {
    toastr.success("Context action: Change e-mail");
  };

  onDisableClick = user => {
    const { updateUserStatus, filter, fetchPeople, onLoading } = this.props;

    onLoading(true);
    updateUserStatus(EmployeeStatus.Disabled, [user.id])
      .then(fetchPeople(filter))
      .finally(() => {
        onLoading(false);
        toastr.success("Context action: Enable");
      });
  };

  onEnableClick = user => {
    const { updateUserStatus, filter, fetchPeople, onLoading } = this.props;

    onLoading(true);
    updateUserStatus(EmployeeStatus.Active, [user.id])
      .then(fetchPeople(filter))
      .finally(() => {
        onLoading(false);
        toastr.success("Context action: Enable");
      });
  };

  onReassignDataClick = () => {
    toastr.success("Context action: Reassign data");
  };

  onDeletePersonalDataClick = user => {
    toastr.success("Context action: Delete personal data");
  };

  onDeleteProfileClick = () => {
    toastr.success("Context action: Delete profile");
  };

  onInviteAgainClick = () => {
    toastr.success("Context action: Invite again");
  };
  getUserContextOptions = (user, viewer) => {
    let status = "";
    const { t } = this.props;

    if (isAdmin(viewer) || (!isAdmin(viewer) && isMe(user, viewer.userName))) {
      status = getUserStatus(user);
    }

    //console.log("getUserContextOptions", user, viewer, status);

    switch (status) {
      case "normal":
      case "unknown":
        return [
          {
            key: "send-email",
            label: t("PeopleResource:LblSendEmail"),
            onClick: this.onEmailSentClick
          },
          {
            key: "send-message",
            label: t("PeopleResource:LblSendMessage"),
            onClick: this.onSendMessageClick
          },
          { key: "key3", isSeparator: true },
          {
            key: "edit",
            label: t("PeopleResource:LblEdit"),
            onClick: this.onEditClick.bind(this, user)
          },
          {
            key: "change-password",
            label: t("PeopleResource:LblChangePassword"),
            onClick: this.onChangePasswordClick
          },
          {
            key: "change-email",
            label: t("PeopleResource:LblChangeEmail"),
            onClick: this.onChangeEmailClick
          },
          {
            key: "disable",
            label: t("PeopleResource:DisableUserButton"),
            onClick: this.onDisableClick.bind(this, user)
          }
        ];
      case "disabled":
        return [
          {
            key: "enable",
            label: t("PeopleResource:EnableUserButton"),
            onClick: this.onEnableClick.bind(this, user)
          },
          {
            key: "reassign-data",
            label: t("PeopleResource:LblReassignData"),
            onClick: this.onReassignDataClick
          },
          {
            key: "delete-personal-data",
            label: t("PeopleResource:LblRemoveData"),
            onClick: this.onDeletePersonalDataClick.bind(this, user)
          },
          {
            key: "delete-profile",
            label: t("PeopleResource:LblDeleteProfile"),
            onClick: this.onDeleteProfileClick
          }
        ];
      case "pending":
        return [
          {
            key: "edit",
            label: t("PeopleResource:LblEdit"),
            onClick: this.onEditClick.bind(this, user)
          },
          {
            key: "invite-again",
            label: "Invite again",
            onClick: this.onInviteAgainClick
          },
          user.status === EmployeeStatus.Active 
          ? {
            key: "disable",
            label: t("PeopleResource:DisableUserButton"),
            onClick: this.onDisableClick.bind(this, user)
          } : {
            key: "enable",
            label: t("PeopleResource:EnableUserButton"),
            onClick: this.onEnableClick.bind(this, user)
          },
          {
            key: "delete-profile",
            label: t("PeopleResource:LblDeleteProfile"),
            onClick: this.onDeleteProfileClick
          }
        ];
      default:
        return [];
    }
  };

  onContentRowSelect = (checked, user) => {
    console.log("ContentRow onSelect", checked, user);
    if (checked) {
      this.props.selectUser(user);
    } else {
      this.props.deselectUser(user);
    }
  };

  onResetFilter = () => {
    const { filter, fetchPeople, onLoading } = this.props;
    const newFilter = filter.clone(true);
    onLoading(true);
    fetchPeople(newFilter).finally(() => onLoading(false));
  };

  render() {
    console.log("Home SectionBodyContent render()");
    const { users, viewer, selection, history, settings, t } = this.props;

    return users.length > 0 ? (
      <AutoSizer>
        {({ height, width }) => (
          <List
            className="List"
            height={height}
            width={width}
            itemSize={50} // ContentRow height
            itemCount={users.length}
            itemData={users}
            outerElementType={CustomScrollbarsVirtualList}
          >
            {({ data, index, style }) => (
              <Row
                data={data}
                index={index}
                style={style}
                onContentRowSelect={this.onContentRowSelect}
                history={history}
                settings={settings}
                selection={selection}
                viewer={viewer}
                getUserContextOptions={this.getUserContextOptions}
              />
            )}
          </List>
        )}
      </AutoSizer>
    ) : (
      <EmptyScreenContainer
        imageSrc="images/empty_screen_filter.png"
        imageAlt="Empty Screen Filter image"
        headerText={t("PeopleResource:NotFoundTitle")}
        descriptionText={t("PeopleResource:NotFoundDescription")}
        buttons={
          <>
            <Icons.CrossIcon size="small" style={{ marginRight: "4px" }} />
            <Link type="action" isHovered={true} onClick={this.onResetFilter}>
              {t("PeopleResource:ClearButton")}
            </Link>
          </>
        }
      />
    );
  }
}

SectionBodyContent.defaultProps = {
  users: []
};

const mapStateToProps = state => {
  return {
    selection: state.people.selection,
    selected: state.people.selected,
    users: state.people.users,
    viewer: state.auth.user,
    settings: state.auth.settings,
    filter: state.people.filter
  };
};

export default connect(
  mapStateToProps,
  { selectUser, deselectUser, setSelection, fetchPeople, updateUserStatus }
)(withRouter(withTranslation()(SectionBodyContent)));

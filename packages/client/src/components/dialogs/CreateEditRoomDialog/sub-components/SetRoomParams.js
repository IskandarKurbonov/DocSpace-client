import React from "react";
import { inject, observer } from "mobx-react";
import styled from "styled-components";
import { withTranslation } from "react-i18next";

import RoomTypeDropdown from "./RoomTypeDropdown";
import TagInput from "./TagInput";
import RoomType from "./RoomType";

import PermanentSettings from "./PermanentSettings";
import InputParam from "./Params/InputParam";
import ThirdPartyStorage from "./ThirdPartyStorage";
// import IsPrivateParam from "./IsPrivateParam";

import withLoader from "@docspace/client/src/HOCs/withLoader";
import Loaders from "@docspace/common/components/Loaders";
import { getRoomTypeDefaultTagTranslation } from "../data";

import ImageEditor from "@docspace/components/ImageEditor";
import PreviewTile from "@docspace/components/ImageEditor/PreviewTile";
import VirtualDataRoomBlock from "./VirtualDataRoomBlock";
import { RoomsType } from "@docspace/common/constants";
import Text from "@docspace/components/text";
import ChangeRoomOwner from "./ChangeRoomOwner";

const StyledSetRoomParams = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 22px;

  .icon-editor_text {
    margin-bottom: 6px;
  }
  .icon-editor {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: start;
    gap: 16px;
  }
`;

const SetRoomParams = ({
  t,
  roomParams,
  setRoomParams,
  setIsOauthWindowOpen,
  setRoomType,
  tagHandler,
  setIsScrollLocked,
  isEdit,
  isDisabled,
  isValidTitle,
  setIsValidTitle,
  onKeyUp,
  enableThirdParty,
  setChangeRoomOwnerIsVisible,
  isAdmin,
}) => {
  const [previewIcon, setPreviewIcon] = React.useState(null);

  const isVDRRoom = roomParams.type === RoomsType.VirtualDataRoom;

  const onChangeName = (e) => {
    setIsValidTitle(true);
    setRoomParams({ ...roomParams, title: e.target.value });
  };

  const onChangeIsPrivate = () =>
    setRoomParams({ ...roomParams, isPrivate: !roomParams.isPrivate });

  const onChangeStorageLocation = (storageLocation) =>
    setRoomParams({ ...roomParams, storageLocation });

  const onChangeIcon = (icon) => setRoomParams({ ...roomParams, icon: icon });

  const onOwnerChange = () => {
    setChangeRoomOwnerIsVisible(true, true, (roomOwner) =>
      setRoomParams({ ...roomParams, roomOwner })
    );
  };

  return (
    <StyledSetRoomParams>
      {isEdit ? (
        <RoomType t={t} roomType={roomParams.type} type="displayItem" />
      ) : (
        <RoomTypeDropdown
          t={t}
          currentRoomType={roomParams.type}
          setRoomType={setRoomType}
          setIsScrollLocked={setIsScrollLocked}
          isDisabled={isDisabled}
        />
      )}
      {isEdit && (
        <PermanentSettings
          t={t}
          title={roomParams.title}
          isThirdparty={roomParams.isThirdparty}
          storageLocation={roomParams.storageLocation}
          isPrivate={roomParams.isPrivate}
          isDisabled={isDisabled}
        />
      )}
      <InputParam
        id="shared_room-name"
        title={`${t("Common:Name")}:`}
        placeholder={t("Common:EnterName")}
        value={roomParams.title}
        onChange={onChangeName}
        isDisabled={isDisabled}
        isValidTitle={isValidTitle}
        errorMessage={t("Common:RequiredField")}
        onKeyUp={onKeyUp}
        isAutoFocussed={true}
      />
      <TagInput
        t={t}
        tagHandler={tagHandler}
        setIsScrollLocked={setIsScrollLocked}
        isDisabled={isDisabled}
      />

      {/* //TODO: Uncomment when private rooms are done
      {!isEdit && (
        <IsPrivateParam
          t={t}
          isPrivate={roomParams.isPrivate}
          onChangeIsPrivate={onChangeIsPrivate}
        />
      )} */}

      {(isAdmin || isMe) && roomParams.roomOwner && (
        <ChangeRoomOwner
          roomOwner={roomParams.roomOwner}
          onOwnerChange={onOwnerChange}
        />
      )}

      {isVDRRoom && <VirtualDataRoomBlock t={t} />}

      {canOwnerChange && roomParams.roomOwner && (
        <div>
          <Text fontWeight={600} fontSize="13px">
            {t("Files:RoomOwner")}
          </Text>

          <div className="room-owner-block">
            <StyledIcon
              className="react-svg-icon"
              src={roomParams.roomOwner.avatarSmall}
            />
            <div className="owner-display-name-block">
              <Text fontWeight={600} fontSize="13px">
                {roomParams.roomOwner.displayName}
              </Text>
              {isMe && (
                <Text className="me-label">({t("Common:MeLabel")})</Text>
              )}
            </div>
          </div>

          <Link
            isHovered
            type="action"
            fontWeight={600}
            fontSize="13px"
            className="change-owner-link"
            onClick={onOwnerChange}
          >
            {t("Common:ChangeButton")}
          </Link>
        </div>
      )}

      {!isEdit && enableThirdParty && (
        <ThirdPartyStorage
          t={t}
          roomTitle={roomParams.title}
          storageLocation={roomParams.storageLocation}
          onChangeStorageLocation={onChangeStorageLocation}
          setIsScrollLocked={setIsScrollLocked}
          setIsOauthWindowOpen={setIsOauthWindowOpen}
          isDisabled={isDisabled}
        />
      )}

      <div>
        <Text fontWeight={600} className="icon-editor_text">
          {t("Icon")}
        </Text>
        <ImageEditor
          t={t}
          isDisabled={isDisabled}
          image={roomParams.icon}
          setPreview={setPreviewIcon}
          onChangeImage={onChangeIcon}
          classNameWrapperImageCropper={"icon-editor"}
          Preview={
            <PreviewTile
              t={t}
              title={roomParams.title || t("Files:NewRoom")}
              previewIcon={previewIcon}
              tags={roomParams.tags.map((tag) => tag.name)}
              isDisabled={isDisabled}
              defaultTagLabel={getRoomTypeDefaultTagTranslation(
                roomParams.type,
                t
              )}
            />
          }
        />
      </div>
    </StyledSetRoomParams>
  );
};

export default inject(({ auth, dialogsStore }) => {
  const { user } = auth.userStore;
  const { setChangeRoomOwnerIsVisible } = dialogsStore;
  return {
    setChangeRoomOwnerIsVisible,
    isAdmin: user.isAdmin || user.isOwner,
  };
})(
  observer(
    withTranslation(["CreateEditRoomDialog", "Translations"])(
      withLoader(SetRoomParams)(<Loaders.SetRoomParamsLoader />)
    )
  )
);

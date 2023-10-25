import React, { useState, useCallback, useEffect, memo } from "react";
import styled, { useTheme } from "styled-components";
import { FixedSizeList as List, areEqual } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import InfiniteLoader from "react-window-infinite-loader";
import User from "./User";
import { isMobile } from "@docspace/components/utils/device";
import throttle from "lodash/throttle";
import Loaders from "@docspace/common/components/Loaders";

const StyledMembersList = styled.div`
  height: ${(props) => props.height + "px"};
`;

const Item = memo(({ data, index, style }) => {
  const {
    t,
    members,
    setMembers,
    security,
    membersHelper,
    currentMember,
    updateRoomMemberRole,
    selectionParentRoom,
    setSelectionParentRoom,
    changeUserType,
    setIsScrollLocked,
    canInviteUserInRoomAbility,
    onRepeatInvitation,
    membersFilter,
    setMembersFilter,
    fetchMembers,
    hasNextPage,
    statuses,
  } = data;

  const user = members[index];
  const status = statuses ? statuses.find((s) => s.id === user.id) : null;

  if (!user) {
    return (
      <div style={{ ...style, width: "calc(100% - 8px)", margin: "0 -16px" }}>
        <Loaders.SelectorRowLoader
          isMultiSelect={false}
          isContainer={true}
          isUser={true}
        />
      </div>
    );
  }

  return (
    <div key={user.id} style={{ ...style, width: "calc(100% - 8px)" }}>
      <User
        t={t}
        user={user}
        key={user.id}
        security={security}
        membersHelper={membersHelper}
        currentMember={currentMember}
        updateRoomMemberRole={updateRoomMemberRole}
        roomId={selectionParentRoom.id}
        roomType={selectionParentRoom.roomType}
        selectionParentRoom={selectionParentRoom}
        setSelectionParentRoom={setSelectionParentRoom}
        changeUserType={changeUserType}
        setIsScrollLocked={setIsScrollLocked}
        isTitle={user.isTitle}
        isExpect={user.isExpect}
        showInviteIcon={canInviteUserInRoomAbility && user.isExpect}
        onRepeatInvitation={onRepeatInvitation}
        setMembers={setMembers}
        membersFilter={membersFilter}
        setMembersFilter={setMembersFilter}
        fetchMembers={fetchMembers}
        hasNextPage={hasNextPage}
        withStatus={!user.isExpect}
        status={status}
      />
    </div>
  );
}, areEqual);

const itemSize = 48;
const MembersList = (props) => {
  const {
    t,
    security,
    membersHelper,
    currentMember,
    updateRoomMemberRole,
    selectionParentRoom,
    setSelectionParentRoom,
    changeUserType,
    setIsScrollLocked,
    members,
    setMembers,
    hasNextPage,
    itemCount,
    onRepeatInvitation,
    loadNextPage,
    membersFilter,
    setMembersFilter,
    fetchMembers,
    statuses,
  } = props;

  const { interfaceDirection } = useTheme();

  const itemsCount = hasNextPage ? members.length + 1 : members.length;

  const canInviteUserInRoomAbility = security?.EditAccess;
  const [isNextPageLoading, setIsNextPageLoading] = useState(false);
  const [isMobileView, setIsMobileView] = useState(isMobile());

  const onResize = throttle(() => {
    const isMobileView = isMobile();
    setIsMobileView(isMobileView);
  }, 300);

  useEffect(() => {
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
    };
  });

  const isItemLoaded = useCallback(
    (index) => {
      return !hasNextPage || index < itemsCount;
    },
    [hasNextPage, itemsCount]
  );

  const loadMoreItems = useCallback(
    async (startIndex) => {
      setIsNextPageLoading(true);
      if (!isNextPageLoading) {
        await loadNextPage(startIndex - 1);
      }
      setIsNextPageLoading(false);
    },
    [isNextPageLoading, loadNextPage]
  );

  return (
    <StyledMembersList id="infoPanelMembersList" height={itemsCount * itemSize}>
      <AutoSizer>
        {({ height, width }) => (
          <InfiniteLoader
            isItemLoaded={isItemLoaded}
            itemCount={hasNextPage ? itemCount + 1 : itemCount}
            loadMoreItems={loadMoreItems}
          >
            {({ onItemsRendered, ref }) => {
              const listWidth = isMobileView ? width + 16 : width + 20; // for scroll

              return (
                <List
                  style={{ overflow: "hidden" }}
                  direction={interfaceDirection}
                  ref={ref}
                  width={listWidth}
                  height={height}
                  itemCount={itemsCount}
                  itemSize={itemSize}
                  itemData={{
                    t,
                    security,
                    membersHelper,
                    currentMember,
                    updateRoomMemberRole,
                    selectionParentRoom,
                    setSelectionParentRoom,
                    changeUserType,
                    setIsScrollLocked,
                    members,
                    setMembers,
                    canInviteUserInRoomAbility,
                    onRepeatInvitation,
                    membersFilter,
                    setMembersFilter,
                    fetchMembers,
                    hasNextPage,
                    statuses,
                  }}
                  onItemsRendered={onItemsRendered}
                >
                  {Item}
                </List>
              );
            }}
          </InfiniteLoader>
        )}
      </AutoSizer>
    </StyledMembersList>
  );
};

export default MembersList;

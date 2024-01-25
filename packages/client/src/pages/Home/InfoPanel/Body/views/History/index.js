import React, { useState, useEffect, useRef, useTransition } from "react";
import { inject, observer } from "mobx-react";
import { withTranslation } from "react-i18next";

import { StyledHistoryList, StyledHistorySubtitle } from "../../styles/history";

import Loaders from "@docspace/common/components/Loaders";
import { parseHistory } from "./../../helpers/HistoryHelper";
import HistoryBlock from "./HistoryBlock";
import NoHistory from "../NoItem/NoHistory";

const History = ({
  t,
  selection,
  historyWithFileList,
  selectedFolder,
  selectionHistory,
  setSelectionHistory,
  selectionParentRoom,
  getInfoPanelItemIcon,
  getHistory,
  checkAndOpenLocationAction,
  openUser,
  isVisitor,
  isCollaborator,
  calendarDay,
}) => {
  const isMount = useRef(true);
  const abortControllerRef = useRef(new AbortController());

  const [isPending, startTransition] = useTransition();

  const [isLoading, setIsLoading] = useState(false);

  const fetchHistory = async (itemId) => {
    if (isLoading) {
      abortControllerRef.current?.abort();
      abortControllerRef.current = new AbortController();
    } else setIsLoading(true);

    let module = "files";
    if (selection.isRoom) module = "rooms";
    else if (selection.isFolder) module = "folders";

    getHistory(module, itemId, abortControllerRef.current?.signal)
      .then((data) => {
        if (isMount.current)
          startTransition(() => {
            const parsedHistory = parseHistory(t, data);
            setSelectionHistory(parsedHistory);
          });
      })
      .catch((err) => {
        if (err.message !== "canceled") console.error(err);
      })
      .finally(() => {
        if (isMount.current) setIsLoading(false);
      });
  };

  useEffect(() => {
    if (!isMount.current) return;
    fetchHistory(selection.id);
  }, [selection.id]);

  useEffect(() => {
    if (!calendarDay) return;

    const historyListNode = document.getElementById("history-list-info-panel");

    if (!historyListNode) return;

    const scroll = historyListNode.closest(".scroller");

    let dateCoincidingWithCalendarDay = null;

    selectionHistory.every((item) => {
      if (dateCoincidingWithCalendarDay) return false;

      item.feeds.every((feed) => {
        if (feed.json.ModifiedDate.slice(0, 10) === calendarDay) {
          dateCoincidingWithCalendarDay = feed.json.ModifiedDate;
        }
      });

      return true;
    });

    if (dateCoincidingWithCalendarDay) {
      const dayNode = historyListNode.getElementsByClassName(
        dateCoincidingWithCalendarDay
      );

      if (!dayNode[0]) return;

      //TODO:const 120
      const y = dayNode[0].offsetTop - 120;
      scroll.scrollTo(0, y);

      return;
    }

    //If there are no entries in the history for the selected day
    const calendarDayModified = new Date(calendarDay);
    let nearestNewerDate = null;

    selectionHistory.every((item, indexItem) => {
      if (nearestNewerDate) return false;

      item.feeds.every((feed) => {
        const date = new Date(feed.json.ModifiedDate);

        //Stop checking all entries for one day
        if (date > calendarDayModified) return false;

        //Looking for the nearest new date
        if (date < calendarDayModified) {
          //if there are no nearby new entries in the post history, then scroll to the last one
          if (indexItem === 0) {
            nearestNewerDate = feed.json.ModifiedDate;
            return false;
          }

          nearestNewerDate =
            selectionHistory[indexItem - 1].feeds[0].json.ModifiedDate;
        }
      });

      return true;
    });

    if (nearestNewerDate) {
      const dayNode = historyListNode.getElementsByClassName(nearestNewerDate);

      if (!dayNode[0]) return;
      //TODO:const 120
      const y = dayNode[0].offsetTop - 120;
      scroll.scrollTo(0, y);
    }
  }, [calendarDay]);

  useEffect(() => {
    return () => {
      abortControllerRef.current?.abort();
      isMount.current = false;
    };
  }, []);

  if (!selectionHistory) return <Loaders.InfoPanelViewLoader view="history" />;
  if (!selectionHistory?.length) return <NoHistory t={t} />;

  return (
    <StyledHistoryList id="history-list-info-panel">
      {selectionHistory.map(({ day, feeds }) => [
        <StyledHistorySubtitle key={day}>{day}</StyledHistorySubtitle>,
        ...feeds.map((feed, i) => (
          <HistoryBlock
            key={feed.json.Id}
            t={t}
            feed={feed}
            selection={selection}
            selectedFolder={selectedFolder}
            selectionParentRoom={selectionParentRoom}
            getInfoPanelItemIcon={getInfoPanelItemIcon}
            checkAndOpenLocationAction={checkAndOpenLocationAction}
            openUser={openUser}
            isVisitor={isVisitor}
            isCollaborator={isCollaborator}
            withFileList={historyWithFileList}
            isLastEntity={i === feeds.length - 1}
          />
        )),
      ])}
    </StyledHistoryList>
  );
};

export default inject(({ auth, filesStore, filesActionsStore }) => {
  const { userStore } = auth;
  const {
    selection,
    selectionHistory,
    setSelectionHistory,
    historyWithFileList,
    selectionParentRoom,
    getInfoPanelItemIcon,
    openUser,
    calendarDay,
  } = auth.infoPanelStore;
  const { personal, culture } = auth.settingsStore;

  const { getHistory } = filesStore;
  const { checkAndOpenLocationAction } = filesActionsStore;

  const { user } = userStore;
  const isVisitor = user.isVisitor;
  const isCollaborator = user.isCollaborator;

  return {
    personal,
    culture,
    selection,
    selectionHistory,
    setSelectionHistory,
    historyWithFileList,
    selectionParentRoom,
    getInfoPanelItemIcon,
    getHistory,
    checkAndOpenLocationAction,
    openUser,
    isVisitor,
    isCollaborator,
    calendarDay,
  };
})(withTranslation(["InfoPanel", "Common", "Translations"])(observer(History)));

import { makeAutoObservable } from "mobx";

import Filter from "@docspace/shared/api/people/filter";
import RoomsFilter from "@docspace/shared/api/rooms/filter";
import { getPortal, getPortalUsersCount } from "@docspace/shared/api/portal";
import { getFilesUsedSpace } from "@docspace/shared/api/files";
import { toastr } from "@docspace/shared/components/toast";
import {
  checkRecalculateQuota,
  getQuotaSettings,
  recalculateQuota,
} from "@docspace/shared/api/settings";

const FILTER_COUNT = 6;

class StorageManagement {
  isInit = false;
  portalInfo = null;
  activeUsersCount = null;
  filesUsedSpace = {};
  quotaSettings = {};
  intervalId = null;

  needRecalculating = false;
  isRecalculating = false;

  constructor(filesStore, peopleStore, authStore) {
    this.filesStore = filesStore;
    this.peopleStore = peopleStore;
    this.authStore = authStore;
    makeAutoObservable(this);
  }

  basicRequests = async (isInit) => {
    const { fetchRooms } = this.filesStore;
    const { usersStore } = this.peopleStore;
    const { getUsersList } = usersStore;

    const userFilterData = Filter.getDefault();
    userFilterData.pageCount = FILTER_COUNT;

    const roomFilterData = RoomsFilter.getDefault();
    roomFilterData.pageCount = FILTER_COUNT;
    const requests = [
      getUsersList(userFilterData),
      fetchRooms(null, roomFilterData),
      getPortal(),
      getPortalUsersCount(),
      getFilesUsedSpace(),
      getQuotaSettings(),
    ];

    isInit && requests.push(checkRecalculateQuota());

    [
      ,
      ,
      this.portalInfo,
      this.activeUsersCount,
      this.filesUsedSpace,
      this.quotaSettings,
      this.needRecalculating,
    ] = await Promise.all(requests);

    if (!this.quotaSettings.lastRecalculateDate && isInit) {
      await recalculateQuota();
      this.getIntervalCheckRecalculate();
      return;
    }

    if (this.needRecalculating) this.getIntervalCheckRecalculate();
  };

  init = async () => {
    try {
      await this.basicRequests(true);

      this.isInit = true;
    } catch (e) {
      toastr.error(e);
    }
  };

  updateQuotaInfo = async (type) => {
    const { fetchRooms } = this.filesStore;
    const { usersStore } = this.peopleStore;
    const { getUsersList } = usersStore;
    const { getTenantExtra } = this.authStore;

    const userFilterData = Filter.getDefault();
    userFilterData.pageCount = FILTER_COUNT;

    const roomFilterData = RoomsFilter.getDefault();
    roomFilterData.pageCount = FILTER_COUNT;

    const requests = [getTenantExtra()];

    type === "user"
      ? requests.push(getUsersList(userFilterData))
      : requests.push(fetchRooms(null, roomFilterData));

    try {
      await Promise.all(requests);
    } catch (e) {
      toastr.error(e);
    }
  };

  setIsRecalculating = (isRecalculating) => {
    this.isRecalculating = isRecalculating;
  };
  getIntervalCheckRecalculate = () => {
    let isWaitRequest = false;
    this.intervalId = setInterval(async () => {
      try {
        if (isWaitRequest) {
          return;
        }

        isWaitRequest = true;

        const result = await checkRecalculateQuota();
        !this.isRecalculating && this.setIsRecalculating(true);

        if (result === false) {
          this.clearIntervalCheckRecalculate();

          this.setIsRecalculating(false);

          try {
            await this.basicRequests();
          } catch (e) {
            toastr.error(e);
          }
          return;
        }

        isWaitRequest = false;
      } catch (e) {
        this.clearIntervalCheckRecalculate();

        this.setIsRecalculating(false);
      }
    }, 2000);
  };

  clearIntervalCheckRecalculate = () => {
    this.intervalId && clearInterval(this.intervalId);

    this.intervalId = null;
  };
}

export default StorageManagement;
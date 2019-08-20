import React, { useCallback } from "react";
import { connect } from "react-redux";
import { FilterInput } from "asc-web-components";
import { fetchPeople } from "../../../../../store/people/actions";
import find from "lodash/find";
import result from "lodash/result";
import { isAdmin } from "../../../../../store/auth/selectors";
import { useTranslation } from 'react-i18next';

const getSortData = () => {
  return [
    { key: "firstname", label: "By first name" },
    { key: "lastname", label: "By last name" }
  ];
};

const getEmployeeStatus = filterValues => {
  const employeeStatus = result(
    find(filterValues, value => {
      return value.group === "filter-status";
    }),
    "key"
  );

  return employeeStatus ? +employeeStatus : null;
};

const getActivationStatus = filterValues => {
  const activationStatus = result(
    find(filterValues, value => {
      return value.group === "filter-email";
    }),
    "key"
  );

  return activationStatus ? +activationStatus : null;
};

const getRole = filterValues => {
  const employeeStatus = result(
    find(filterValues, value => {
      return value.group === "filter-type";
    }),
    "key"
  );

  return employeeStatus || null;
};

const SectionFilterContent = ({ fetchPeople, filter, onLoading, user }) => {
  const { t, i18n } = useTranslation();
  const selectedFilterData = {
    filterValue: [],
    sortDirection: filter.sortOrder === "ascending" ? "asc" : "desc",
    sortId: filter.sortBy
  };

  selectedFilterData.inputValue = filter.search;

  if (filter.employeeStatus) {
    selectedFilterData.filterValue.push({
      key: `${filter.employeeStatus}`,
      group: "filter-status"
    });
  }

  if (filter.activationStatus) {
    selectedFilterData.filterValue.push({
      key: `${filter.activationStatus}`,
      group: "filter-email"
    });
  }

  if (filter.role) {
    selectedFilterData.filterValue.push({
      key: filter.role,
      group: "filter-type"
    });
  }

  const getData = useCallback(() => {
    const options = !isAdmin(user)
      ? []
      : [
          {
            key: "filter-status",
            group: "filter-status",
            label: t('PeopleResource:LblStatus'),
            isHeader: true
          },
          { key: "1", group: "filter-status", label: t('PeopleResource:LblActive') },
          { key: "2", group: "filter-status", label: t('PeopleResource:LblTerminated') }
        ];

    return [
      ...options,
      {
        key: "filter-email",
        group: "filter-email",
        label: t('PeopleResource:Email'),
        isHeader: true
      },
      { key: "1", group: "filter-email", label: t('PeopleResource:LblActive') },
      { key: "2", group: "filter-email", label: t('PeopleResource:LblPending') },
      {
        key: "filter-type",
        group: "filter-type",
        label: t('PeopleResource:LblByType'),
        isHeader: true
      },
      { key: "admin", group: "filter-type", label: "Administrator"},
      { key: "user", group: "filter-type", label: "User" },
      { key: "guest", group: "filter-type", label: "Guest" },
      {
        key: "filter-group",
        group: "filter-group",
        label: t('PeopleResource:LblOther'),
        isHeader: true
      },
      { key: "filter-type-group", group: "filter-group", label: "Group" }
    ];
  }, [user]);

  const onFilter = useCallback((data) => {
    console.log(data);

    const newFilter = filter.clone();
    newFilter.page = 0;
    newFilter.sortBy = data.sortId;
    newFilter.sortOrder =
      data.sortDirection === "desc" ? "descending" : "ascending";
    newFilter.employeeStatus = getEmployeeStatus(data.filterValue);
    newFilter.activationStatus = getActivationStatus(data.filterValue);
    newFilter.role = getRole(data.filterValue);
    newFilter.search = data.inputValue || null;

    onLoading(true);
    fetchPeople(newFilter).finally(() => onLoading(false));

  }, [onLoading,fetchPeople,filter])

  return (
    <FilterInput
      getFilterData={getData}
      getSortData={getSortData}
      selectedFilterData={selectedFilterData}
      onFilter={onFilter}
    />
  );
};

function mapStateToProps(state) {
  return {
    user: state.auth.user,
    filter: state.people.filter
  };
}

export default connect(
  mapStateToProps,
  { fetchPeople }
)(SectionFilterContent);

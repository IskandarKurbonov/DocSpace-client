import { inject } from "mobx-react";
import { useState, useRef, useEffect } from "react";
import { withTranslation } from "react-i18next";

import * as Styled from "./index.styled";

const SearchFilter = ({ oformsFilter, filterOformsBySearch }) => {
  const [value, setValue] = useState(oformsFilter.search);
  const onSearch = (val) => filterOformsBySearch(val);
  const onClear = () => onChangeValue("");
  const onChangeValue = (val) => {
    setValue(val);
    onSearch(val);
  };

  useEffect(() => {
    if (value !== oformsFilter.search) setValue(oformsFilter.search);
  }, [oformsFilter.search]);

  const ref = useRef(null);
  const onInputClick = () => ref?.current?.focus();
  const onInputOutsideClick = (e) =>
    !ref?.current?.contains(e.target) && ref.current.blur();
  useEffect(() => {
    document.addEventListener("mousedown", onInputOutsideClick);
    return () => document.removeEventListener("mousedown", onInputOutsideClick);
  }, [ref]);

  return (
    <Styled.SearchFilter
      forwardedRef={ref}
      className="first-name"
      tabIndex={1}
      placeholder={"Search"}
      value={value}
      onChange={onChangeValue}
      onClick={onInputClick}
      onClearSearch={onClear}
    />
  );
};

export default inject(({ oformsStore }) => ({
  oformsFilter: oformsStore.oformsFilter,
  filterOformsBySearch: oformsStore.filterOformsBySearch,
}))(withTranslation(["FormGallery", "Common"])(SearchFilter));

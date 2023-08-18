import React, { useState, useEffect, useRef, useMemo } from "react";

import { MonthDays, Months, Period, WeekDays, Hours, Minutes } from "./Field";

import { getCronStringFromValues, stringToArray } from "./part";
import { defaultCronString, defaultPeriod } from "./constants";
import { getPeriodFromCronParts } from "./util";

import CronProps from "./Cron.props";
import { PeriodType } from "./types";
import { CronWrapper, Suffix } from "./Cron.styled";

function Cron({ value = defaultCronString, setValue, onError }: CronProps) {
  const valueRef = useRef<string>(value);

  const [period, setPeriod] = useState<PeriodType>(defaultPeriod);

  const [hours, setHours] = useState<number[]>([]);
  const [months, setMonths] = useState<number[]>([]);
  const [minutes, setMinutes] = useState<number[]>([]);
  const [weekDays, setWeekDays] = useState<number[]>([]);
  const [monthDays, setMonthDays] = useState<number[]>([]);

  useEffect(() => {
    onError?.(undefined); // reset error state
    if (valueRef.current !== value) init();
  }, [value]);

  useEffect(() => {
    try {
      const cornString = getCronStringFromValues(
        period,
        months,
        monthDays,
        weekDays,
        hours,
        minutes
      );

      setValue(cornString);
      valueRef.current = cornString;

      onError?.(undefined);
    } catch (error) {
      onError?.(error);
    }
  }, [period, hours, months, minutes, weekDays, monthDays]);

  useEffect(() => {
    init();
  }, []);

  const init = () => {
    try {
      const cronParts = stringToArray(value);
      const period = getPeriodFromCronParts(cronParts);

      const [minutes, hours, monthDays, months, weekDays] = cronParts;

      setMinutes(minutes);
      setHours(hours);
      setMonthDays(monthDays);
      setMonths(months);
      setWeekDays(weekDays);

      setPeriod(period);
    } catch (error) {
      console.log(error);
      onError?.(error);
    }
  };

  const { isYear, isMonth, isWeek, isHour, isMinute } = useMemo(() => {
    const isYear = period === "Year";
    const isMonth = period === "Month";
    const isWeek = period === "Week";
    const isHour = period === "Hour";
    const isMinute = period == "Minute";

    return {
      isYear,
      isMonth,
      isWeek,
      isHour,
      isMinute,
    };
  }, [period]);

  return (
    <CronWrapper>
      <Period period={period} setPeriod={setPeriod} />
      {isYear && <Months months={months} setMonths={setMonths} />}
      {(isYear || isMonth) && (
        <MonthDays
          weekDays={weekDays}
          monthDays={monthDays}
          setMonthDays={setMonthDays}
        />
      )}
      {(isYear || isMonth || isWeek) && (
        <WeekDays
          isWeek={isWeek}
          period={period}
          monthDays={monthDays}
          weekDays={weekDays}
          setWeekDays={setWeekDays}
        />
      )}
      {!isHour && !isMinute && <Hours hours={hours} setHours={setHours} />}

      {!isMinute && (
        <Minutes period={period} minutes={minutes} setMinutes={setMinutes} />
      )}
      <Suffix>UTC</Suffix>
    </CronWrapper>
  );
}

export default Cron;

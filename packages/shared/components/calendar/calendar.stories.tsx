// (c) Copyright Ascensio System SIA 2010-2024
//
// This program is a free software product.
// You can redistribute it and/or modify it under the terms
// of the GNU Affero General Public License (AGPL) version 3 as published by the Free Software
// Foundation. In accordance with Section 7(a) of the GNU AGPL its Section 15 shall be amended
// to the effect that Ascensio System SIA expressly excludes the warranty of non-infringement of
// any third-party rights.
//
// This program is distributed WITHOUT ANY WARRANTY, without even the implied warranty
// of MERCHANTABILITY or FITNESS FOR A PARTICULAR  PURPOSE. For details, see
// the GNU AGPL at: http://www.gnu.org/licenses/agpl-3.0.html
//
// You can contact Ascensio System SIA at Lubanas st. 125a-25, Riga, Latvia, EU, LV-1021.
//
// The  interactive user interfaces in modified source and object code versions of the Program must
// display Appropriate Legal Notices, as required under Section 5 of the GNU AGPL version 3.
//
// Pursuant to Section 7(b) of the License you must retain the original Product logo when
// distributing the program. Pursuant to Section 7(e) we decline to grant you any rights under
// trademark law for use of our trademarks.
//
// All the Product's GUI elements, including illustrations and icon sets, as well as technical writing
// content are licensed under the terms of the Creative Commons Attribution-ShareAlike 4.0
// International. See the License terms at http://creativecommons.org/licenses/by-sa/4.0/legalcode

import React, { useState } from "react";
import moment from "moment";
import { Meta, StoryObj } from "@storybook/react";

import { Calendar } from "./Calendar";
import { CalendarProps } from "./Calendar.types";

const meta = {
  title: "Components/Calendar",
  component: Calendar,
  argTypes: {
    maxDate: { control: "date" },
    minDate: { control: "date" },
    initialDate: { control: "date" },
    locale: {
      type: "string",
      options: [
        "az",
        "ar-SA",
        "zh-cn",
        "cs",
        "nl",
        "en-gb",
        "en",
        "fi",
        "fr",
        "de",
        "de-ch",
        "el",
        "it",
        "ja",
        "ko",
        "lv",
        "pl",
        "pt",
        "pt-br",
        "ru",
        "sk",
        "sl",
        "es",
        "tr",
        "uk",
        "vi",
      ],
    },
    onChange: { action: "onChange" },
  },
  parameters: {
    docs: {
      description: {
        component: "Used to display custom calendar",
      },
    },
    design: {
      type: "figma",
      url: "https://www.figma.com/file/ZiW5KSwb4t7Tj6Nz5TducC/UI-Kit-DocSpace-1.0.0?type=design&node-id=651-4406&mode=design&t=RrB9MOQGCnUPghij-0",
    },
  },
} satisfies Meta<typeof Calendar>;
type Story = StoryObj<typeof Calendar>;

export default meta;

const Template = ({ locale, minDate, maxDate, ...args }: CalendarProps) => {
  const [selectedDate, setSelectedDate] = useState(moment());
  return (
    <Calendar
      {...args}
      selectedDate={selectedDate}
      setSelectedDate={setSelectedDate}
      minDate={minDate}
      maxDate={maxDate}
      locale={locale}
    />
  );
};

export const Default: Story = {
  render: (args) => <Template {...args} />,
  args: {
    locale: "en",
    maxDate: new Date(`${new Date().getFullYear() + 10}/01/01`),
    minDate: new Date("1970/01/01"),
    initialDate: new Date(),
  },
};

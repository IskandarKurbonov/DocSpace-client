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

import React from "react";

import { Meta, StoryObj } from "@storybook/react";

import { Toast } from "./Toast";
import { toastr } from "./sub-components/Toastr";
import { Button, ButtonSize } from "../button";
import { Link, LinkType } from "../link";
import { ToastProps } from "./Toast.type";
import { ToastType } from "./Toast.enums";

const meta = {
  title: "Components/Toast",
  component: Toast,
  argTypes: {
    // withCross: {
    //   description:
    //     "If `false`: toast disappeared after clicking on any area of toast. If `true`: toast disappeared after clicking on close button",
    // },
    // timeout: {
    //   description:
    //     "Time (in milliseconds) for showing your toast. Setting in `0` let you to show toast constantly until clicking on it",
    // },
    // data: {
    //   description: "Any components or data inside a toast",
    // },
  },

  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/ZiW5KSwb4t7Tj6Nz5TducC/UI-Kit-DocSpace-1.0.0?node-id=648%3A4421&mode=dev",
    },
  },
} satisfies Meta<typeof Toast>;
type Story = StoryObj<typeof Toast>;

export default meta;

const BaseTemplate = ({
  type,

  title,
  timeout = 5000,
  withCross = false,
  ...args
}: ToastProps & {
  withCross?: boolean;
  data?: React.ReactNode | string;
  timeout?: number;
}) => {
  return (
    <>
      <Toast {...args} />
      <Button
        label="Show toast"
        primary
        size={ButtonSize.small}
        onClick={() => {
          switch (type) {
            case ToastType.error:
              toastr.error("Demo text for Toast", title, timeout, withCross);
              break;
            case ToastType.warning:
              toastr.warning("Demo text for Toast", title, timeout, withCross);
              break;
            case ToastType.info:
              toastr.info("Demo text for Toast", title, timeout, withCross);
              break;
            default:
              toastr.success("Demo text for Toast", title, timeout, withCross);
              break;
          }
        }}
      />
    </>
  );
};

export const basic: Story = {
  render: (args) => <BaseTemplate {...args} />,
  args: {
    type: ToastType.success,

    title: "Demo title",
  },
};

const AllTemplate = () => {
  const renderAllToast = () => {
    toastr.success(
      "Demo text for success Toast closes in 30 seconds or on click",
      undefined,
      30000,
    );

    toastr.error(
      "Demo text for error Toast closes in 28 seconds or on click",
      undefined,
      28000,
    );

    toastr.warning(
      "Demo text for warning Toast closes in 25 seconds or on click",
      undefined,
      25000,
    );

    toastr.info(
      "Demo text for info Toast closes in 15 seconds or on click",
      undefined,
      15000,
    );

    toastr.success(
      "Demo text for success Toast with title closes in 12 seconds or on click",
      "Demo title",
      12000,
    );

    toastr.error(
      "Demo text for error Toast with title closes in 10 seconds or on click",
      "Demo title",
      10000,
    );

    toastr.warning(
      "Demo text for warning Toast with title closes in 8 seconds or on click",
      "Demo title",
      8000,
    );

    toastr.info(
      "Demo text for info Toast with title closes in 6 seconds or on click",
      "Demo title",
      6000,
    );
    toastr.success(
      "Demo text for success manual closed Toast",
      undefined,
      0,
      true,
      true,
    );
    toastr.error(
      "Demo text for error manual closed Toast",
      undefined,
      0,
      true,
      true,
    );
    toastr.warning(
      "Demo text for warning manual closed Toast",
      undefined,
      0,
      true,
      true,
    );
    toastr.info(
      "Demo text for info manual closed Toast",
      undefined,
      0,
      true,
      true,
    );
    toastr.success(
      <>
        Demo text for success manual closed Toast with title and contains{" "}
        <Link type={LinkType.page} color="gray" href="https://github.com">
          gray link
        </Link>
      </>,
      "Demo title",
      0,
      true,
      true,
    );
    toastr.error(
      "Demo text for error manual closed Toast with title",
      "Demo title",
      0,
      true,
      true,
    );
    toastr.warning(
      "Demo text for warning manual closed Toast with title",
      "Demo title",
      0,
      true,
      true,
    );
    toastr.info(
      "Demo text for info manual closed Toast with title",
      "Demo title",
      0,
      true,
      true,
    );
  };
  return (
    <>
      <Toast />
      <Button
        label="Show all toast"
        primary
        size={ButtonSize.small}
        onClick={() => renderAllToast()}
      />
    </>
  );
};

export const All = {
  render: () => <AllTemplate />,
};

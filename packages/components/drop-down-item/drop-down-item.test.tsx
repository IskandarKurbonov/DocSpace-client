import React from "react";
// @ts-expect-error TS(7016): Could not find a declaration file for module 'enzy... Remove this comment to see the full error message
import { mount, shallow } from "enzyme";
import DropDownItem from ".";
// @ts-expect-error TS(2307): Cannot find module 'PUBLIC_DIR/images/nav.logo.rea... Remove this comment to see the full error message
import NavLogoReactSvgUrl from "PUBLIC_DIR/images/nav.logo.react.svg?url";

const baseProps = {
  isSeparator: false,
  isHeader: false,
  tabIndex: -1,
  label: "test",
  disabled: false,
  icon: NavLogoReactSvgUrl,
  noHover: false,
  // @ts-expect-error TS(2708): Cannot use namespace 'jest' as a value.
  onClick: jest.fn(),
};

// @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
describe("<DropDownItem />", () => {
  // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it("renders without error", () => {
    const wrapper = mount(<DropDownItem {...baseProps} />);

    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(wrapper).toExist();
  });

  // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it("check disabled props", () => {
    const wrapper = mount(<DropDownItem {...baseProps} disabled={true} />);

    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(wrapper.prop("disabled")).toEqual(true);
  });

  // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it("check isSeparator props", () => {
    const wrapper = mount(<DropDownItem {...baseProps} isSeparator={true} />);

    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(wrapper.prop("isSeparator")).toEqual(true);
  });

  // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it("check isHeader props", () => {
    const wrapper = mount(<DropDownItem {...baseProps} isHeader={true} />);

    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(wrapper.prop("isHeader")).toEqual(true);
  });

  // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it("check noHover props", () => {
    const wrapper = mount(<DropDownItem {...baseProps} noHover={true} />);

    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(wrapper.prop("noHover")).toEqual(true);
  });

  // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it("causes function onClick()", () => {
    // @ts-expect-error TS(2708): Cannot use namespace 'jest' as a value.
    const onClick = jest.fn();

    const wrapper = shallow(
      <DropDownItem id="test" {...baseProps} onClick={onClick} />
    );

    wrapper.find("#test").simulate("click");

    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(onClick).toHaveBeenCalled();
  });

  // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it("render without child", () => {
    const wrapper = shallow(<DropDownItem>test</DropDownItem>);

    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(wrapper.props.children).toEqual(undefined);
  });

  // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it("accepts id", () => {
    const wrapper = mount(<DropDownItem {...baseProps} id="testId" />);

    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(wrapper.prop("id")).toEqual("testId");
  });

  // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it("accepts className", () => {
    const wrapper = mount(<DropDownItem {...baseProps} className="test" />);

    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(wrapper.prop("className")).toEqual("test");
  });

  // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it("accepts style", () => {
    const wrapper = mount(
      <DropDownItem {...baseProps} style={{ color: "red" }} />
    );

    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(wrapper.getDOMNode().style).toHaveProperty("color", "red");
  });
});

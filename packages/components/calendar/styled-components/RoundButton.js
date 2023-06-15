import styled from "styled-components";

export const RoundButton = styled.button`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  outline: 1px solid;
  outline-color: ${(props) => props.theme.calendar.outlineColor};
  border: none;
  background-color: transparent;
  position: relative;

  transition: all ease-in-out 0.05s;

  span {
    border-color: ${(props) =>
      props.disabled
        ? props.theme.calendar.disabledArrow
        : props.theme.calendar.arrowColor};
  }

  :hover {
    cursor: ${(props) => (props.disabled ? "auto" : "pointer")};
  }
`;

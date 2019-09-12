import React from "react";
import styled from "styled-components";
import { tablet } from "../../../utils/device";

const StyledMain = styled.main`
  height: 100vh;
  padding: ${props => (props.fullscreen ? "0" : "0 0 0 56px")};
  width: 100vw;
  z-index: 0;
  display: flex;
  flex-direction: row;

  @media ${tablet} {
    padding: ${props => (props.fullscreen ? "0" : "56px 0 0 0")};
  }
`;

const Main = React.memo(props => {
  //console.log("Main render");
  return <StyledMain {...props} />;
});

Main.displayName = "Main";

export default Main;

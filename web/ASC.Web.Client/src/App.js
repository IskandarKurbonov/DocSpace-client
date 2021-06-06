import React from "react";
import ErrorBoundary from "@appserver/common/components/ErrorBoundary";
import Shell from "studio/shell";
import "@appserver/common/custom.scss";
//import "../custom.scss";

const App = () => {
  return (
    <ErrorBoundary>
      <Shell />
    </ErrorBoundary>
  );
};

export default App;

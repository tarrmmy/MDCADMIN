import React from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import { useStateContext } from "./contexts/ContextProvider";
import { RecoilRoot } from "recoil";

import Main from "./pages/main";

const App = () => {
  const { currentMode } = useStateContext();

  return (
    <div className={currentMode === "Dark" ? "dark" : ""}>
      <BrowserRouter>
        <RecoilRoot>
          <Main />
        </RecoilRoot>
      </BrowserRouter>
    </div>
  );
};

export default App;

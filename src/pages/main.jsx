import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import React, { useEffect } from "react";
import { FiSettings } from "react-icons/fi";
import { Navbar, Sidebar, ThemeSettings } from "../components";
import Dashboard from "./Dashboard";
import { Route, Routes } from "react-router-dom";
import Record from "./Record";
import Participants from "./Participants";
import Kanban from "./Kanban";
import Editor from "./Editor";
import {
  Area,
  Bar,
  Calendar,
  Category,
  Clinic,
  ColorMapping,
  Financial,
  Line,
  Pie,
  Pyramid,
} from ".";
import { useStateContext } from "../contexts/ContextProvider";
import { useRecoilValue } from "recoil";
import authAtom from "../atoms/auth/auth.atom";
import LoginPage from "./auth/login";

const Main = () => {
  const { isLoggedIn } = useRecoilValue(authAtom);
  const {
    setCurrentColor,
    setCurrentMode,
    currentMode,
    activeMenu,
    currentColor,
    themeSettings,
    setThemeSettings,
  } = useStateContext();

  useEffect(() => {
    const currentThemeColor = localStorage.getItem("colorMode");
    const currentThemeMode = localStorage.getItem("themeMode");
    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor);
      setCurrentMode(currentThemeMode);
    }
  }, []);
  return (
    <>
      <div className="flex relative dark:bg-main-dark-bg">
        <div className="fixed right-4 bottom-4" style={{ zIndex: "1000" }}>
          <TooltipComponent content="Settings" position="Top">
            <button
              type="button"
              onClick={() => setThemeSettings(true)}
              style={{ background: currentColor, borderRadius: "50%" }}
              className="text-3xl text-white p-3 hover:drop-shadow-xl hover:bg-light-gray"
            >
              <FiSettings />
            </button>
          </TooltipComponent>
        </div>
        {activeMenu ? (
          <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white ">
            <Sidebar />
          </div>
        ) : (
          <div className="w-0 dark:bg-secondary-dark-bg">
            <Sidebar />
          </div>
        )}
        <div
          className={
            activeMenu
              ? "dark:bg-main-dark-bg  bg-main-bg min-h-screen md:ml-72 w-full  "
              : "bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2 "
          }
        >
          <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full ">
            <Navbar />
          </div>
          <div>
            {themeSettings && <ThemeSettings />}

            <Routes>
              {/* dashboard  */}
              <Route path="/" element={<Dashboard />} />
              <Route path="/dashboard" element={<Dashboard />} />

              {/* departments  */}
              <Route path="/record" element={<Record />} />
              <Route path="/participants" element={<Participants />} />
              <Route path="/clinic" element={<Clinic />} />

              {/* tools  */}
              <Route path="/kanban" element={<Kanban />} />
              <Route path="/editor" element={<Editor />} />
              <Route path="/calendar" element={<Calendar />} />
              {/* <Route path="/color-picker" element={<ColorPicker />} /> */}

              {/* statistics  */}
              <Route path="/line" element={<Line />} />
              <Route path="/area" element={<Area />} />
              <Route path="/gender" element={<Bar />} />
              <Route path="/branch-pie" element={<Pie />} />
              <Route path="/financial" element={<Financial />} />
              <Route path="/branch-bar" element={<ColorMapping />} />
              <Route path="/pyramid" element={<Pyramid />} />
              <Route path="/category" element={<Category />} />
            </Routes>
          </div>
          {/* <Footer /> */}
        </div>
      </div>
      <LoginPage isLoggedIn={isLoggedIn} />
    </>
  );
};

export default Main;

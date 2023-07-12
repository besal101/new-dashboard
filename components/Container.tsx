"use client";
import { PropsWithChildren, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "@/store";
import {
  toggleRTL,
  toggleTheme,
  toggleLocale,
  toggleMenu,
  toggleLayout,
  toggleAnimation,
  toggleNavbar,
  toggleSemidark,
} from "@/store/themeConfigSlice";

interface ContainerProps {
  children: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({ children }) => {
  const themeConfig = useSelector((state: IRootState) => state.themeConfig);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(toggleTheme(localStorage.getItem("theme") || themeConfig.theme));
    dispatch(toggleMenu(localStorage.getItem("menu") || themeConfig.menu));
    dispatch(
      toggleLayout(localStorage.getItem("layout") || themeConfig.layout)
    );
    dispatch(
      toggleRTL(localStorage.getItem("rtlClass") || themeConfig.rtlClass)
    );
    dispatch(
      toggleAnimation(
        localStorage.getItem("animation") || themeConfig.animation
      )
    );
    dispatch(
      toggleNavbar(localStorage.getItem("navbar") || themeConfig.navbar)
    );
    dispatch(
      toggleSemidark(localStorage.getItem("semidark") || themeConfig.semidark)
    );
    // locale
    const locale = localStorage.getItem("i18nextLng") || themeConfig.locale;
    dispatch(toggleLocale(locale));
  }, [
    dispatch,
    themeConfig.theme,
    themeConfig.menu,
    themeConfig.layout,
    themeConfig.rtlClass,
    themeConfig.animation,
    themeConfig.navbar,
    themeConfig.locale,
    themeConfig.semidark,
  ]);

  return (
    <div
      className={`${(themeConfig.sidebar && "toggle-sidebar") || ""} ${
        themeConfig.menu
      } ${themeConfig.layout} ${
        themeConfig.rtlClass
      } main-section relative text-sm font-normal antialiased`}
    >
      {children}
    </div>
  );
};

export default Container;

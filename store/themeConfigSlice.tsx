"use client";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isDarkMode: false,
  sidebar: false,
  theme: "light",
  menu: "vertical",
  layout: "full",
  animation: "animate__fadeIn",
  navbar: "navbar-sticky",
  rtlClass: "ltr",
  locale: "en",
  semidark: false,
};

const themeConfigSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    toggleTheme(state, { payload }) {
      payload = payload || state.theme; // light | dark | system
      localStorage.setItem("theme", payload);
      state.theme = payload;
      if (payload === "light") {
        state.isDarkMode = false;
      } else if (payload === "dark") {
        state.isDarkMode = true;
      } else if (payload === "system") {
        if (
          window.matchMedia &&
          window.matchMedia("(prefers-color-scheme: dark)").matches
        ) {
          state.isDarkMode = true;
        } else {
          state.isDarkMode = false;
        }
      }

      if (state.isDarkMode) {
        document.querySelector("body")?.classList.add("dark");
      } else {
        document.querySelector("body")?.classList.remove("dark");
      }
    },
    toggleRTL(state, { payload }) {
      payload = payload || state.rtlClass; // rtl, ltr
      localStorage.setItem("rtlClass", payload);
      state.rtlClass = payload;
      document
        .querySelector("html")
        ?.setAttribute("dir", state.rtlClass || "ltr");
    },
    toggleMenu(state, { payload }) {
      payload = payload || state.menu; // vertical, collapsible-vertical, horizontal
      state.sidebar = false; // reset sidebar state
      localStorage.setItem("menu", payload);
      state.menu = payload;
    },
    toggleLayout(state, { payload }) {
      payload = payload || state.layout; // full, boxed-layout
      localStorage.setItem("layout", payload);
      state.layout = payload;
    },
    toggleAnimation(state, { payload }) {
      payload = payload || state.animation; // animate__fadeIn, animate__fadeInDown, animate__fadeInUp, animate__fadeInLeft, animate__fadeInRight, animate__slideInDown, animate__slideInLeft, animate__slideInRight, animate__zoomIn
      payload = payload?.trim();
      localStorage.setItem("animation", payload);
      state.animation = payload;
    },
    toggleNavbar(state, { payload }) {
      payload = payload || state.navbar; // navbar-sticky, navbar-floating, navbar-static
      localStorage.setItem("navbar", payload);
      state.navbar = payload;
    },
    toggleLocale(state, { payload }) {
      payload = payload || state.locale;
      localStorage.setItem("i18nextLng", payload);
      state.locale = payload;
    },
    toggleSidebar(state) {
      state.sidebar = !state.sidebar;
    },
    toggleSemidark(state, { payload }) {
      payload = payload === true || payload === "true" ? true : false;
      localStorage.setItem("semidark", payload);
      state.semidark = payload;
    },
    setPageTitle(state, { payload }) {
      document.title = `${payload} | Lifesmile - Tailwind Dashboard ERP Systems`;
    },
  },
});

export const {
  toggleTheme,
  toggleMenu,
  toggleLayout,
  toggleAnimation,
  toggleNavbar,
  toggleSidebar,
  setPageTitle,
  toggleRTL,
  toggleLocale,
  toggleSemidark,
} = themeConfigSlice.actions;

export default themeConfigSlice.reducer;

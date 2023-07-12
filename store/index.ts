"use client";

import { combineReducers, configureStore } from "@reduxjs/toolkit";
import themeConfigSlice from "./themeConfigSlice";
import modalSlice from "./modalSlice";
import mediaSlice from "@/features/MediaManage/UploadMedia";
import variationmediaSlice from "@/features/MediaManage/UploadVariationMedia";

const rootReducer = combineReducers({
  themeConfig: themeConfigSlice,
  modal: modalSlice,
  media: mediaSlice,
  variationmedia: variationmediaSlice,
});

export const store = configureStore({
  reducer: rootReducer,
  devTools: true,
});

export type IRootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

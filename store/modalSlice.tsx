"use client";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface ModalState {
  show: boolean;
  modal: string;
  payload?: any;
}

const initialState: ModalState = {
  show: false,
  modal: "",
  payload: null,
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    toggleModal: (state, action: PayloadAction<ModalState>) => {
      state.show = !state.show;
      state.modal = action.payload.modal;
      state.payload = action.payload.payload;
    },
  },
});

export const { toggleModal } = modalSlice.actions;

export default modalSlice.reducer;

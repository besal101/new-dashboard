"use client";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface MediaValues {
  image?: string | null;
  images?: string[];
}

const initialState: MediaValues = {
  image: null,
  images: [],
};

export const mediaSlice = createSlice({
  name: "images",
  initialState,
  reducers: {
    setMedia: (state, action: PayloadAction<MediaValues>) => {
      const { image, images } = action.payload;

      if (image !== undefined) {
        state.image = image;
      }

      if (images !== undefined) {
        state.images = images;
      }
    },
  },
});

export const { setMedia } = mediaSlice.actions;

export default mediaSlice.reducer;

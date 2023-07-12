"use client";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface Variation {
  images: string[];
  value: string;
}

interface MediaState {
  variationMedia: Variation[];
}

const initialState: MediaState = {
  variationMedia: [],
};

export const variationmediaSlice = createSlice({
  name: "images",
  initialState,
  reducers: {
    setMultiMedia: (state, action: PayloadAction<Variation>) => {
      const { images, value } = action.payload;

      const existingVariationIndex = state.variationMedia.findIndex(
        (variation) => variation.value === value
      );

      if (existingVariationIndex !== -1) {
        // Variation with the same value exists, push images into its array
        state.variationMedia[existingVariationIndex].images.push(...images);
      } else {
        // Variation doesn't exist, create a new one with the value and images
        state.variationMedia.push({ images, value });
      }
    },
  },
});

export const { setMultiMedia } = variationmediaSlice.actions;

export default variationmediaSlice.reducer;

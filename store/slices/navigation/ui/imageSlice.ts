// store/slices/navigation/ui/imageSlice.ts

import { createSlice } from '@reduxjs/toolkit';

const _images = [
  '/images/home/hero/rito-picture1.png',
  '/images/utilities/imageQuote/Impressions.jpg',
  '/images/utilities/imageQuote/MarketingUX.jpg',
  '/images/utilities/imageQuote/Product.jpg',
  '/images/utilities/imageQuote/Roadmap.jpg',
  '/images/pages/services/special.jpg',
  '/images/pages/services/CoreServices/mobile.jpg',
];

interface ImageState {
  currentImage: string;
}

const initialState: ImageState = {
  currentImage: _images[Math.floor(Math.random() * _images.length)],
};

const imageSlice = createSlice({
  name: 'randomImage',
  initialState,
  reducers: {
    randomizeImage(state) {
      state.currentImage = _images[Math.floor(Math.random() * _images.length)];
    },
  },
});

export const { randomizeImage } = imageSlice.actions;
export default imageSlice.reducer;

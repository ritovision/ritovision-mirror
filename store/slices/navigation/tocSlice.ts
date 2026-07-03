// \test\store\slices\navigation\tocSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the shape of a single ToC link
export interface TocLink {
  href: string;
  text: string;
  level: string; // e.g., 'h2', 'h3'
  isPrimary?: boolean; // For primary sections that should be styled differently
  isSpacer?: boolean; // For spacer elements
}

// Define the shape of this slice's state
interface TocState {
  links: TocLink[];
  hasToc: boolean;
}

// Set the initial state
const initialState: TocState = {
  links: [],
  hasToc: false,
};

const tocSlice = createSlice({
  name: 'toc',
  initialState,
  reducers: {
    /**
     * Action to register the ToC links when a ToC component mounts.
     * It populates the state with the links and sets hasToc to true.
     */
    registerToc: (state, action: PayloadAction<TocLink[]>) => {
      state.links = action.payload;
      state.hasToc = action.payload.length > 0;
    },
    /**
     * Action to clear the ToC links when the component unmounts.
     * This is crucial for pages that do not have a ToC.
     */
    clearToc: (state) => {
      state.links = [];
      state.hasToc = false;
    },
  },
});

export const { registerToc, clearToc } = tocSlice.actions;
export default tocSlice.reducer;
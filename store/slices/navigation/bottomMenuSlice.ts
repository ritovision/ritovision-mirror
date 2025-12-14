// \test\store\slices\navigation\bottomMenuSlice.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type DrawerType = 'toc' | 'ai' | null;

interface BottomMenuState {
  currentPage: string;
  activeSection: string | null;
  globalOverrides: { priority: number; variant: any }[];
  activeDrawer: DrawerType;
}

const initialState: BottomMenuState = {
  currentPage: "/",
  activeSection: null,
  globalOverrides: [],
  activeDrawer: null,
};

const bottomMenuSlice = createSlice({
  name: "bottomMenu",
  initialState,
  reducers: {
    /**
     * Set the current page path.
     */
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },

    /**
     * Set the active section within the bottom menu.
     */
    setActiveSection(state, action) {
      state.activeSection = action.payload;
    },

    /**
     * Override global settings with priority and variant.
     */
    setGlobalOverrides(state, action) {
      state.globalOverrides = action.payload;
    },

    /**
     * Open a specific drawer. If same drawer is already open, close it.
     * If different drawer is open, switch to the new one.
     */
    openDrawer(state, action: PayloadAction<DrawerType>) {
      if (state.activeDrawer === action.payload) {
        state.activeDrawer = null;
      } else {
        state.activeDrawer = action.payload;
      }
    },

    /**
     * Toggle a specific drawer open/closed.
     */
    toggleDrawer(state, action: PayloadAction<DrawerType>) {
      if (state.activeDrawer === action.payload) {
        state.activeDrawer = null;
      } else {
        state.activeDrawer = action.payload;
      }
    },

    /**
     * Close any open drawer.
     */
    closeDrawer(state) {
      state.activeDrawer = null;
    },
  },
});

export const {
  setCurrentPage,
  setActiveSection,
  setGlobalOverrides,
  openDrawer,
  toggleDrawer,
  closeDrawer,
} = bottomMenuSlice.actions;

export const selectCurrentPage = (state: any) =>
  state.bottomMenu.currentPage;
export const selectActiveSection = (state: any) =>
  state.bottomMenu.activeSection;
export const selectGlobalOverrides = (state: any) =>
  state.bottomMenu.globalOverrides;
export const selectActiveDrawer = (state: any) =>
  state.bottomMenu.activeDrawer;

export default bottomMenuSlice.reducer;

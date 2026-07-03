import { createSlice } from '@reduxjs/toolkit';

interface MenuState {
  isTopMenuVisible: boolean;
  isBottomMenuVisible: boolean;
}

const initialState: MenuState = {
  isTopMenuVisible: true,
  isBottomMenuVisible: false,
};

const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    showTopMenu(state) {
      state.isTopMenuVisible = true;
    },
    hideTopMenu(state) {
      state.isTopMenuVisible = false;
    },
    showBottomMenu(state) {
      state.isBottomMenuVisible = true;
    },
    hideBottomMenu(state) {
      state.isBottomMenuVisible = false;
    },
  },
});

export const {
  showTopMenu,
  hideTopMenu,
  showBottomMenu,
  hideBottomMenu,
} = menuSlice.actions;
export default menuSlice.reducer;

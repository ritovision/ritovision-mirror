import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface MenuTransitionState {
  isTransitioning: boolean;
}

const initialState: MenuTransitionState = {
  isTransitioning: false,
};

const menuTransitionSlice = createSlice({
  name: 'menuTransition',
  initialState,
  reducers: {
    setMenuTransition(state, action: PayloadAction<boolean>) {
      state.isTransitioning = action.payload;
    },
  },
});

export const { setMenuTransition } = menuTransitionSlice.actions;
export default menuTransitionSlice.reducer;

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface MobileModalState {
  isOpen: boolean;
}

const initialState: MobileModalState = {
  isOpen: false,
};

const mobileModalSlice = createSlice({
  name: 'mobileModal',
  initialState,
  reducers: {
    toggleMobileMenu(state, action: PayloadAction<boolean>) {
      state.isOpen = action.payload;
    },
  },
});

export const { toggleMobileMenu } = mobileModalSlice.actions;
export default mobileModalSlice.reducer;

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CheckmarksState {
  [key: string]: boolean;
}

const initialState: CheckmarksState = {};

const uasCheckmarksSlice = createSlice({
  name: 'uasCheckmarks',
  initialState,
  reducers: {
    toggleCheck: (state, action: PayloadAction<string>) => {
      const key = action.payload;
      state[key] = !state[key];
    },
    setCheck: (
      state,
      action: PayloadAction<{ key: string; value: boolean }>
    ) => {
      state[action.payload.key] = action.payload.value;
    },
  },
});

export const { toggleCheck, setCheck } = uasCheckmarksSlice.actions;
export default uasCheckmarksSlice.reducer;

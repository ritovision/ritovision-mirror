// c:/Users/Mattj/ritovision website/test/store/rootReducer.ts

import { combineReducers } from '@reduxjs/toolkit';
import menuReducer from './slices/navigation/menuSlice';
import mobileModalReducer from './slices/navigation/mobileModalSlice';
import imageReducer from './slices/navigation/ui/imageSlice';
import menuTransitionReducer from './slices/navigation/menuTransitionSlice';
import bottomMenuReducer from './slices/navigation/bottomMenuSlice';
import uasCheckmarksReducer from './slices/pages/projects/uas/checkmarkSlice';
import tocReducer from './slices/navigation/tocSlice'; // This path should be correct
import aiPromptsReducer from './slices/navigation/aiPromptSlice';

const rootReducer = combineReducers({
  menu:           menuReducer,
  mobileModal:    mobileModalReducer,
  randomImage:    imageReducer,
  menuTransition: menuTransitionReducer,
  bottomMenu:     bottomMenuReducer,
  uasCheckmarks:  uasCheckmarksReducer,
  toc:            tocReducer,
  aiPrompts:      aiPromptsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
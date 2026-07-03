// .storybook/manager.ts
import { addons } from 'storybook/manager-api';
import RitoTheme from './RitoTheme';

// Make your CSS variables available to the manager UI
import './fonts.css';
import '../styles/globals.css';

addons.setConfig({
  theme: RitoTheme,
});

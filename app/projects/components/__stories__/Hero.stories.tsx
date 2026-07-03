import type { Meta, StoryObj } from '@storybook/react';
import { Provider } from 'react-redux';
import { configureStore, createSlice } from '@reduxjs/toolkit';
import Hero from '../Hero';

// Mock the menuTransition slice
const menuTransitionSlice = createSlice({
    name: 'menuTransition',
    initialState: { isTransitioning: false },
    reducers: {
        setTransitioning: (state, action) => {
            state.isTransitioning = action.payload;
        },
    },
});

// Create a mock store factory
const createMockStore = (initialState = {}) => {
    return configureStore({
        reducer: {
            menuTransition: menuTransitionSlice.reducer,
        },
        preloadedState: initialState,
    });
};

const meta: Meta<typeof Hero> = {
    title: 'Projects/Hero',
    component: Hero,
    parameters: {
        layout: 'fullscreen',
    },
    decorators: [
        (Story) => (
            <Provider store={createMockStore({ menuTransition: { isTransitioning: false } })}>
                <div style={{ backgroundColor: '#000', minHeight: '100vh', position: 'relative' }}>
                    <Story />
                </div>
            </Provider>
        ),
    ],
};

export default meta;
type Story = StoryObj<typeof Hero>;

export const Default: Story = {};

export const Transitioning: Story = {
    decorators: [
        (Story) => (
            <Provider store={createMockStore({ menuTransition: { isTransitioning: true } })}>
                <div style={{ backgroundColor: '#000', minHeight: '100vh', position: 'relative' }}>
                    <Story />
                </div>
            </Provider>
        ),
    ],
};

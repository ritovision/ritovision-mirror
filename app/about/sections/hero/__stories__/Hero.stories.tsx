import type { Meta, StoryObj } from "@storybook/react";
import Hero from "../Hero";
import { Provider } from "react-redux";
import { configureStore, createSlice } from "@reduxjs/toolkit";

// Mock the menuTransition slice
const menuTransitionSlice = createSlice({
    name: "menuTransition",
    initialState: { isTransitioning: false },
    reducers: {
        setTransitioning: (state, action) => {
            state.isTransitioning = action.payload;
        },
    },
});

// Create a mock store
const mockStore = configureStore({
    reducer: {
        menuTransition: menuTransitionSlice.reducer,
        // Add other reducers if needed, but Hero only uses menuTransition
    },
});

const meta: Meta<typeof Hero> = {
    title: "About/Sections/Hero",
    component: Hero,
    decorators: [
        (Story) => (
            <Provider store={mockStore}>
                <Story />
            </Provider>
        ),
    ],
    parameters: {
        layout: "fullscreen",
    },
};

export default meta;

type Story = StoryObj<typeof Hero>;

export const Default: Story = {};

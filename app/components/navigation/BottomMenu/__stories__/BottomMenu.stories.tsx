import type { Meta, StoryObj, StoryContext } from '@storybook/nextjs-vite';
import { Provider } from 'react-redux';
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import BottomMenu from '../index';
import tocReducer from '@/store/slices/navigation/tocSlice';
import bottomMenuReducer from '@/store/slices/navigation/bottomMenuSlice';
import { RootState } from '@/store/rootReducer';
import aiPromptReducer from '@/store/slices/navigation/aiPromptSlice';

const tocLinks = [
    { id: 'section-1', text: 'Introduction', level: 'h1', href: '#section-1' },
    { id: 'section-2', text: 'Getting Started', level: 'h2', href: '#section-2' },
    { id: 'section-3', text: 'Advanced Usage', level: 'h2', href: '#section-3' },
    { id: 'section-4', text: 'Conclusion', level: 'h1', href: '#section-4' },
    { id: 'section-5', text: 'FAQ', level: 'h2', href: '#section-5' },
    { id: 'section-6', text: 'Performance', level: 'h2', href: '#section-6' },
    { id: 'section-7', text: 'Accessibility', level: 'h2', href: '#section-7' },
    { id: 'section-8', text: 'Wrap-up', level: 'h1', href: '#section-8' },
];

// 1. Mock Redux Slices
// We keep 'menu' as a mock to prevent the 'hideBottomMenu' action from actually hiding the menu
// when the component mounts (since scrollY is 0 in the story).
const defaultMenuState = { isBottomMenuVisible: false };

const rootReducer = combineReducers({
    toc: tocReducer,
    menu: (state = defaultMenuState) => state, // Mocked
    bottomMenu: bottomMenuReducer,
    aiPrompts: aiPromptReducer,
});

const createMockStore = (initialState: Partial<RootState>) => {
    return configureStore({
        reducer: rootReducer,
        preloadedState: initialState,
    });
};

// 2. Decorator to wrap stories in Redux + Layout
const withLayoutAndRedux = (Story: React.ComponentType, context: StoryContext) => {
    const store = createMockStore(context.args.initialState || {});

    return (
        <Provider store={store}>
            <div
                style={{
                    minHeight: '200vh',
                    background: 'var(--primary-blue)',
                    padding: '48px 0 240px',
                    boxSizing: 'border-box',
                }}
            >
                <div
                    style={{
                        margin: '0 auto',
                        maxWidth: '960px',
                        textAlign: 'center',
                        color: 'white',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '32px',
                    }}
                >
                    <div>
                        <h1>Scroll down to see the menu behavior</h1>
                        <p>The menu should appear when you scroll down (if configured to do so).</p>
                        <p>Use the TOC drawer to jump to any section on this page.</p>
                    </div>

                    {tocLinks.map((section, index) => (
                        <section
                            key={section.id}
                            id={section.id}
                            style={{
                                padding: '48px 24px',
                                borderRadius: '12px',
                                background: 'rgba(255,255,255,0.04)',
                                border: '1px solid rgba(255,255,255,0.06)',
                                textAlign: 'center',
                            }}
                        >
                            <h2 style={{ marginBottom: '12px' }}>
                                {section.text}
                            </h2>
                            <p>
                                Section {index + 1} placeholder content for "{section.text}". Scroll or
                                use the TOC to jump here.
                            </p>
                        </section>
                    ))}
                </div>

                <Story />
            </div>
        </Provider>
    );
};

const meta = {
    title: 'Navigation/BottomMenu',
    component: BottomMenu,
    decorators: [withLayoutAndRedux],
    parameters: {
        layout: 'fullscreen', // Important for fixed positioning components
        nextjs: {
            appDirectory: true,
        },
    },
    // We use a custom 'initialState' arg to pass data to our Redux mock
    argTypes: {
        initialState: { control: 'object' },
    },
} satisfies Meta<typeof BottomMenu & { initialState?: Partial<RootState> }>;

export default meta;
type Story = StoryObj<typeof meta>;

// --- Stories ---

// 1. Default (Hidden)
// Simulates initial load at top of page. Menu should be hidden.
export const DefaultHidden: Story = {
    args: {

        initialState: {
            menu: { isBottomMenuVisible: false },
            bottomMenu: { activeDrawer: null },
            toc: { hasToc: false, links: [] },
        },
    },
};

// 2. Visible
// Simulates being scrolled down. Menu should be visible.
export const Visible: Story = {
    args: {

        initialState: {
            menu: { isBottomMenuVisible: true },
            bottomMenu: { activeDrawer: null },
            toc: { hasToc: false, links: [] },
        },
    },
};

// 3. With TOC Available
// Menu visible, and TOC button should appear because we have links.
export const WithTOC: Story = {
    args: {

        initialState: {
            menu: { isBottomMenuVisible: true },
            bottomMenu: { activeDrawer: null },
            toc: { hasToc: true, links: tocLinks },
        },
    },
};

// 4. TOC Drawer Open
// Opens the TOC drawer via play so the drawer remains open after the initial closeDrawer() effect.
export const TocDrawerOpen: Story = {
    args: {

        initialState: {
            menu: { isBottomMenuVisible: true },
            bottomMenu: { activeDrawer: null },
            toc: { hasToc: true, links: tocLinks },
        },
    },
    play: async ({ canvasElement }) => {
        const tocButton = await waitForElement(
            canvasElement,
            (root) => root.querySelector('button[aria-label*="table of contents" i]') as HTMLButtonElement | null
        );
        tocButton?.click();
    },
};

// 5. AI Drawer Open
// Opens the AI drawer via play for a stable preset-state view.
export const AiDrawerOpen: Story = {
    args: {

        initialState: {
            menu: { isBottomMenuVisible: true },
            bottomMenu: { activeDrawer: null },
            toc: { hasToc: false, links: [] },
            aiPrompts: {
                prompts: [
                    { id: 'default', name: 'Default', text: 'Please explain this webpage to me' },
                    { id: 'custom-1', name: 'Summarize', text: 'Summarize this page in 3 bullet points' },
                ],
                activePromptId: 'default',
            },
        },
    },
    play: async ({ canvasElement }) => {
        const aiButton = await waitForElement(
            canvasElement,
            (root) => root.querySelector('button[aria-label*="ai assistant" i]') as HTMLButtonElement | null
        );
        aiButton?.click();
    },
};

// 6. Variant: Test Page (Color Change)
// Uses Next.js parameter mocking to change the pathname to /test
export const TestPageVariant: Story = {
    parameters: {
        nextjs: {
            navigation: {
                pathname: '/test',
            },
        },
    },
    args: {

        initialState: {
            menu: { isBottomMenuVisible: true },
            bottomMenu: { activeDrawer: null },
            toc: { hasToc: false, links: [] },
        },
    },
};

// 7. Interactive
// Uses real reducers for drawers, but mocked reducer for menu visibility.
// This allows drawers to open/close without the menu auto-hiding.
export const Interactive: Story = {
    args: {

        initialState: {
            menu: { isBottomMenuVisible: true },
            bottomMenu: { activeDrawer: null },
            toc: { hasToc: true, links: tocLinks },
            aiPrompts: {
                prompts: [
                    { id: 'default', name: 'Default', text: 'Please explain this webpage to me' },
                ],
                activePromptId: 'default',
            },
        },
    },
};

// Small helper to poll for elements inside the story canvas without external deps.
async function waitForElement<T extends Element>(
    root: HTMLElement,
    finder: (root: HTMLElement) => T | null,
    timeout = 4000,
    interval = 100
): Promise<T | null> {
    const end = Date.now() + timeout;
    let el: T | null = null;

    while (Date.now() < end) {
        el = finder(root);
        if (el) return el;
        await new Promise((resolve) => setTimeout(resolve, interval));
    }

    return el;
}

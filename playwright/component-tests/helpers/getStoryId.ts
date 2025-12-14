// helpers/getStoryId.ts
export interface StorybookIndex {
    v: number
    entries: Record<
        string,
        {
            id: string
            title: string
            name: string
            importPath: string
            [key: string]: any
        }
    >
}

// You can override this from your Playwright command:
// STORYBOOK_BASE_URL=http://localhost:6006 pnpm test-storybook
const STORYBOOK_BASE_URL =
    process.env.STORYBOOK_BASE_URL ?? 'http://127.0.0.1:6006'

export async function getStoryId(
    title: string,
    storyName: string = 'Default'
): Promise<string | null> {
    try {
        const indexUrl = `${STORYBOOK_BASE_URL.replace(/\/$/, '')}/index.json`

        const res = await fetch(indexUrl)
        if (!res.ok) {
            console.warn(
                `Storybook index.json fetch failed with status ${res.status} at ${indexUrl}`
            )
            return null
        }

        const index = (await res.json()) as StorybookIndex

        const entry = Object.values(index.entries).find(
            (e) => e.title === title && e.name === storyName
        )

        if (!entry) {
            console.warn(
                `Story not found in Storybook index for title="${title}", story="${storyName}"`
            )
            return null
        }

        return entry.id
    } catch (error) {
        console.error('Error reading Storybook index via HTTP:', error)
        return null
    }
}

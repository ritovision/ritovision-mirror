import { test, expect, Page } from '@playwright/test'
import { getStoryId } from '../helpers/getStoryId'

const TITLE = 'Utilities/Forms/TextArea'

async function gotoStory(page: Page, storyName: string) {
    const storyId = await getStoryId(TITLE, storyName)
    if (!storyId) throw new Error(`Story not found: ${TITLE} - ${storyName}`)
    await page.goto(`/iframe.html?id=${storyId}&viewMode=story`)
    await page.waitForSelector('textarea', { state: 'visible' })
}

test.describe('TextArea', () => {
    test('should render and handle input', async ({ page }) => {
        await gotoStory(page, 'Default')

        const textarea = page.getByLabel('Message')
        await expect(textarea).toBeVisible()
        await expect(textarea).toHaveAttribute('placeholder', 'Share your thoughts')

        // Type text
        await textarea.fill('Hello World')
        await expect(textarea).toHaveValue('Hello World')

        // Clear text
        await textarea.fill('')
        await expect(textarea).toHaveValue('')
    })

    test('should render visual states', async ({ page }) => {
        await gotoStory(page, 'Visual states')

        await expect(page.getByLabel('Pre')).toBeVisible()
        await expect(page.getByLabel('Focus')).toBeVisible()

        const validTextarea = page.getByRole('textbox', { name: 'Valid', exact: true })
        await expect(validTextarea).toHaveValue('Pre-populated text')

        const invalidTextarea = page.getByLabel('Invalid')
        await expect(page.getByText('Tell us a bit more.')).toBeVisible()

        const disabledTextarea = page.getByLabel('Disabled')
        await expect(disabledTextarea).toBeDisabled()
        await expect(disabledTextarea).toHaveValue('Locked')
    })
})

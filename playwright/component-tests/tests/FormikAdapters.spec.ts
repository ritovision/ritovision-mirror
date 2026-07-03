import { test, expect, Page } from '@playwright/test'
import { getStoryId } from '../helpers/getStoryId'

const TITLE = 'Utilities/Forms/Formik adapters'

async function gotoStory(page: Page, storyName: string) {
    const storyId = await getStoryId(TITLE, storyName)
    if (!storyId) throw new Error(`Story not found: ${TITLE} - ${storyName}`)
    await page.goto(`/iframe.html?id=${storyId}&viewMode=story`)
    await page.waitForSelector('form', { state: 'visible' })
}

test.describe('FormikAdapters', () => {
    test('should validate and submit form', async ({ page }) => {
        await gotoStory(page, 'Adapter form')

        // Submit empty form to trigger validation
        await page.getByRole('button', { name: 'Submit' }).click()

        // Verify validation errors
        await expect(page.getByText('Name is required')).toBeVisible()
        await expect(page.getByText('Email is required')).toBeVisible()
        await expect(page.getByText('Message is required')).toBeVisible()
        await expect(page.getByText('Pick at least one')).toBeVisible()
        await expect(page.getByText('Choose one')).toBeVisible()

        // Fill form
        await page.getByLabel('Name').fill('Ada Lovelace')
        await page.getByLabel('Email').fill('ada@example.com')
        await page.getByLabel('Message').fill('I am writing a very long message for testing purposes.')
        await page.getByRole('checkbox', { name: 'Engineering' }).click()
        await page.getByRole('radio', { name: 'Email' }).click()

        // Verify errors are gone
        await expect(page.getByText('Name is required')).not.toBeVisible()

        // Submit
        const submitButton = page.getByRole('button', { name: 'Submit' })
        await submitButton.click()

        // Verify submitting state
        await expect(page.getByRole('button', { name: 'Submitting...' })).toBeVisible()

        // Wait for submission to complete (mocked 400ms)
        await expect(page.getByRole('button', { name: 'Submit' })).toBeVisible()
    })

    test('should reset form', async ({ page }) => {
        await gotoStory(page, 'Adapter form')

        // Fill form
        await page.getByLabel('Name').fill('Test Name')
        await expect(page.getByLabel('Name')).toHaveValue('Test Name')

        // Reset
        await page.getByRole('button', { name: 'Reset' }).click()

        // Verify reset
        await expect(page.getByLabel('Name')).toHaveValue('')
    })
})

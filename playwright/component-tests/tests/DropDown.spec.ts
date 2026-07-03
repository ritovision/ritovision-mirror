import { test, expect, Page } from '@playwright/test'
import { getStoryId } from '../helpers/getStoryId'

const DROPDOWN_TITLE = 'Utilities/Dropdown'

async function gotoDropdownStory(page: Page, storyName: string) {
    const storyId = await getStoryId(DROPDOWN_TITLE, storyName)

    if (!storyId) {
        throw new Error(
            `Storybook story not found for title "${DROPDOWN_TITLE}" and story "${storyName}". ` +
            `Make sure the story exists and the title/name match.`
        )
    }

    await page.goto(`/iframe.html?id=${storyId}&viewMode=story`)

    // Wait for the dropdown to be visible
    await page.waitForSelector('[data-testid="dropdown"]', { state: 'visible' })
}

test.describe('Dropdown Component', () => {
    test.beforeEach(async ({ page }) => {
        await gotoDropdownStory(page, 'Default')
    })

    test('should render the dropdown with label', async ({ page }) => {
        // Find the dropdown button
        const dropdownButton = page.locator('[role="button"][aria-haspopup="listbox"]')

        // Verify the label is displayed
        await expect(dropdownButton).toContainText('Select a role')
    })

    test('should open dropdown when clicked', async ({ page }) => {
        const dropdownButton = page.locator('[role="button"][aria-haspopup="listbox"]')

        // Verify dropdown is initially closed
        await expect(dropdownButton).toHaveAttribute('aria-expanded', 'false')

        // Click to open
        await dropdownButton.click()

        // Verify dropdown is now open
        await expect(dropdownButton).toHaveAttribute('aria-expanded', 'true')

        // Verify dropdown list is visible
        const dropdownList = page.locator('[role="listbox"]')
        await expect(dropdownList).toBeVisible()
    })

    test('should display all dropdown options when opened', async ({ page }) => {
        const dropdownButton = page.locator('[role="button"][aria-haspopup="listbox"]')

        // Open dropdown
        await dropdownButton.click()

        // Verify all expected options are present
        const expectedOptions = [
            'Explorer',
            'Engineer',
            'Pilot',
            'Scientist',
            'Commander',
            'Medic',
            'Technician',
        ]

        for (const option of expectedOptions) {
            const optionElement = page.locator(`[role="option"]:has-text("${option}")`)
            await expect(optionElement).toBeVisible()
        }
    })

    test('should select an option and close dropdown', async ({ page }) => {
        const dropdownButton = page.locator('[role="button"][aria-haspopup="listbox"]')

        // Open dropdown
        await dropdownButton.click()

        // Click on "Engineer" option
        const engineerOption = page.locator('[role="option"]:has-text("Engineer")')
        await engineerOption.click()

        // Verify dropdown is closed
        await expect(dropdownButton).toHaveAttribute('aria-expanded', 'false')

        // Verify selected value is displayed
        await expect(dropdownButton).toContainText('Engineer')
    })

    test('should update selected value in display text', async ({ page }) => {
        const dropdownButton = page.locator('[role="button"][aria-haspopup="listbox"]')

        // Select first option
        await dropdownButton.click()
        await page.locator('[role="option"]:has-text("Pilot")').click()
        await expect(dropdownButton).toContainText('Pilot')

        // Select a different option
        await dropdownButton.click()
        await page.locator('[role="option"]:has-text("Medic")').click()
        await expect(dropdownButton).toContainText('Medic')
    })

    test('should close dropdown when clicking outside', async ({ page }) => {
        const dropdownButton = page.locator('[role="button"][aria-haspopup="listbox"]')

        // Open dropdown
        await dropdownButton.click()
        await expect(dropdownButton).toHaveAttribute('aria-expanded', 'true')

        // Click outside the dropdown
        await page.click('body', { position: { x: 0, y: 0 } })

        // Verify dropdown is closed
        await expect(dropdownButton).toHaveAttribute('aria-expanded', 'false')
    })

    test('should handle keyboard navigation (Enter key)', async ({ page }) => {
        const dropdownButton = page.locator('[role="button"][aria-haspopup="listbox"]')

        // Focus and press Enter to open
        await dropdownButton.focus()
        await dropdownButton.press('Enter')

        // Verify dropdown is open
        await expect(dropdownButton).toHaveAttribute('aria-expanded', 'true')

        // Press Enter on an option
        const scientistOption = page.locator('[role="option"]:has-text("Scientist")')
        await scientistOption.press('Enter')

        // Verify selection
        await expect(dropdownButton).toContainText('Scientist')
    })
})

test.describe('Dropdown Component - States Story', () => {
    test('should render different states correctly', async ({ page }) => {
        // Navigate to the States story
        await gotoDropdownStory(page, 'States')

        // Wait for dropdowns to be visible
        await page.waitForSelector('[data-testid="dropdown"]', { state: 'visible' })

        // Get all dropdowns (there should be 4: pre, valid, invalid, disabled)
        const dropdowns = page.locator('[data-testid="dropdown"]')
        const count = await dropdowns.count()

        expect(count).toBe(4)

        // Test disabled state
        const disabledDropdown = page.locator('[data-testid="dropdown"][aria-disabled="true"]')
        await expect(disabledDropdown).toBeVisible()

        // Try to click disabled dropdown - it should not open
        // Use force: true because Playwright won't click disabled elements by default
        const disabledButton = disabledDropdown.locator('[role="button"]')
        await disabledButton.click({ force: true })
        await expect(disabledButton).toHaveAttribute('aria-expanded', 'false')
    })
})

test.describe('Dropdown Component - Controlled Story', () => {
    test('should render with pre-selected value', async ({ page }) => {
        // Navigate to the Controlled story (which has Engineer pre-selected)
        await gotoDropdownStory(page, 'Controlled')

        const dropdownButton = page.locator('[role="button"][aria-haspopup="listbox"]')

        // Verify Engineer is pre-selected (from the story's useState initial value)
        await expect(dropdownButton).toContainText('Engineer')
    })
})

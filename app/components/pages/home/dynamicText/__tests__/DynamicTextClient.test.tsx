// app/components/pages/home/dynamicText/__tests__/DynamicTextClient.test.tsx
import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import DynamicTextClient from "../DynamicTextClient";
import styles from "../DynamicText.module.css";

describe("DynamicTextClient (unit)", () => {
  it("renders the initial title inside the title container", () => {
    const { container } = render(<DynamicTextClient />);

    const titleWrapper = container.querySelector(`.${styles.title}`);
    expect(titleWrapper).not.toBeNull();
    expect(titleWrapper?.textContent).toContain("Chief Integration Officer");
  });

  it('eventually shows the second title "Product Strategist" after the animation cycle', async () => {
    render(<DynamicTextClient />);

    // Sanity check: initial title is shown
    expect(
      await screen.findByText("Chief Integration Officer", {}, { timeout: 1000 })
    ).toBeInTheDocument();

    // After ~2.6s the index should advance to "Product Strategist"
    const secondTitle = await screen.findByText(
      "Product Strategist",
      {},
      { timeout: 4000 } // 4s > 2600ms total cycle time
    );

    expect(secondTitle).toBeInTheDocument();
  });
});

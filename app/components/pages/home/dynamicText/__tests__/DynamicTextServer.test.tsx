// app/components/pages/home/dynamicText/__tests__/DynamicTextServer.test.tsx
import React from "react";
import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import DynamicTextServer from "../DynamicTextServer";
import styles from "../DynamicText.module.css";

describe("DynamicTextServer (integration)", () => {
  it("renders container, borders, and the dynamic title area with initial text", () => {
    const { container } = render(<DynamicTextServer />);

    // Outer container with layout styling
    const outer = container.querySelector(`.${styles.container}`);
    expect(outer).not.toBeNull();

    // Top and bottom borders
    const borderTop = container.querySelector(`.${styles.borderTop}`);
    const borderBottom = container.querySelector(`.${styles.borderBottom}`);
    expect(borderTop).not.toBeNull();
    expect(borderBottom).not.toBeNull();

    // Title wrapper from the client component and initial text
    const titleWrapper = container.querySelector(`.${styles.title}`);
    expect(titleWrapper).not.toBeNull();
    expect(titleWrapper?.textContent).toContain("Chief Integration Officer");
  });
});

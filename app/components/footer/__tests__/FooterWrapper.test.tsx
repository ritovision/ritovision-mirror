import React from "react";
import { render, screen } from "@testing-library/react";
import FooterWrapper from "../FooterWrapper";
import FooterWrapperClient from "../FooterWrapperClient";

vi.mock("../footerMobile/FooterMobileServer", () => ({
  __esModule: true,
  default: () => <div data-testid="mobile-footer">Mobile Footer</div>,
}));

vi.mock("../footerDesktop/FooterDesktopServer", () => ({
  __esModule: true,
  default: () => <div data-testid="desktop-footer">Desktop Footer</div>,
}));

describe("<FooterWrapper />", () => {
  it("renders both mobile and desktop footers inside the wrapper", () => {
    render(<FooterWrapper />);

    const wrapper = document.querySelector("[data-footer-wrapper]") as HTMLElement | null;
    expect(wrapper).toBeInTheDocument();
    expect(screen.getByTestId("mobile-footer")).toBeInTheDocument();
    expect(screen.getByTestId("desktop-footer")).toBeInTheDocument();
  });
});

describe("<FooterWrapperClient />", () => {
  it("places provided footers into their respective containers", () => {
    render(
      <FooterWrapperClient
        mobileFooter={<div data-testid="custom-mobile" />}
        desktopFooter={<div data-testid="custom-desktop" />}
      />
    );

    const wrapper = document.querySelector("[data-footer-wrapper]") as HTMLElement | null;
    expect(wrapper).toHaveAttribute("data-footer-wrapper");

    const mobile = screen.getByTestId("custom-mobile");
    const desktop = screen.getByTestId("custom-desktop");

    expect(mobile.parentElement?.className).toMatch(/mobileContainer/);
    expect(desktop.parentElement?.className).toMatch(/desktopContainer/);
  });
});

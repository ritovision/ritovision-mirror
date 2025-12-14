import React from "react";
import { render, screen } from "@testing-library/react";

vi.mock("next/link", () => ({
  __esModule: true,
  default: ({ href, children, ...props }: { href: string | { pathname?: string }; children: React.ReactNode;[key: string]: unknown }) => (
    <a href={typeof href === "string" ? href : href?.pathname ?? ""} {...props}>
      {children}
    </a>
  ),
}));

vi.mock("@/components/utilities/media/images/OrbImage", () => ({
  __esModule: true,
  default: ({ alt, src, ...props }: { alt: string; src: string;[key: string]: unknown }) => (
    <img alt={alt} src={src} {...props} />
  ),
}));

vi.mock("@/components/utilities/buttons/ButtonSection", () => ({
  __esModule: true,
  default: (props: { title?: string }) => <div data-testid="button-section">{props?.title || "Button Section"}</div>,
}));

vi.mock("../utilities/footerMenu/FooterMenuClient", () => ({
  __esModule: true,
  default: () => <div data-testid="footer-menu-client">Footer Menu</div>,
}));

vi.mock("../utilities/footerSocials/FooterSocialsClient", () => ({
  __esModule: true,
  default: () => <div data-testid="footer-socials-client">Footer Socials</div>,
}));

vi.mock("../utilities/cobrands/CobrandClient", () => ({
  __esModule: true,
  default: () => <div data-testid="cobrand-client">Cobrand</div>,
}));

vi.mock("../utilities/footerLegal/FooterLegalClient", () => ({
  __esModule: true,
  default: () => <div data-testid="footer-legal-client">Footer Legal</div>,
}));

import FooterMobileClient from "../footerMobile/FooterMobileClient";

describe("<FooterMobileClient />", () => {
  it("renders the logo, call-to-action, children, and footer utilities", () => {
    render(
      <FooterMobileClient>
        <p data-testid="child">Hello footer</p>
      </FooterMobileClient>
    );

    const footer = screen.getByRole("contentinfo");
    expect(footer).toBeInTheDocument();

    const logo = screen.getByAltText("RitoVision Logo");
    expect(logo).toHaveAttribute("src", "/images/brand/ritovision-wordmark-tm.png");
    expect(logo.closest("a")).toHaveAttribute("href", "/");

    expect(screen.getByTestId("button-section")).toBeInTheDocument();
    expect(screen.getByTestId("child")).toBeInTheDocument();
    expect(screen.getByTestId("footer-menu-client")).toBeInTheDocument();
    expect(screen.getByTestId("footer-socials-client")).toBeInTheDocument();
    expect(screen.getByTestId("cobrand-client")).toBeInTheDocument();
    expect(screen.getByTestId("footer-legal-client")).toBeInTheDocument();
  });
});

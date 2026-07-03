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
  default: ({ alt, src, ...props }: { alt: string; src: string; fill?: boolean; priority?: boolean; containerClassName?: string;[key: string]: unknown }) => (
    <img alt={alt} src={src} {...props} />
  ),
}));

vi.mock("@/components/utilities/buttons/ButtonSection", () => ({
  __esModule: true,
  default: (props: { title?: string;[key: string]: unknown }) => <div data-testid="button-section">{props?.title || "Button Section"}</div>,
}));

vi.mock("../utilities/footerMenu/FooterMenuClient", () => ({
  __esModule: true,
  default: () => <div data-testid="footer-menu">Footer Menu</div>,
}));

vi.mock("../utilities/footerSocials/FooterSocialsClient", () => ({
  __esModule: true,
  default: () => <div data-testid="footer-socials">Footer Socials</div>,
}));

vi.mock("../utilities/cobrands/CobrandClient", () => ({
  __esModule: true,
  default: () => <div data-testid="cobrands">Cobrand Content</div>,
}));

vi.mock("../utilities/footerLegal/FooterLegalClient", () => ({
  __esModule: true,
  default: () => <div data-testid="footer-legal">Footer Legal</div>,
}));

import FooterDesktopClient from "../footerDesktop/FooterDesktopClient";

describe("<FooterDesktopClient />", () => {
  it("renders logos, social links, menus, and supporting sections", () => {
    render(<FooterDesktopClient />);

    expect(screen.getByAltText("RitoVision Logomark")).toBeInTheDocument();
    expect(screen.getByAltText("RitoVision Wordmark")).toBeInTheDocument();
    expect(screen.getByTestId("button-section")).toBeInTheDocument();
    expect(screen.getByTestId("footer-socials")).toBeInTheDocument();
    expect(screen.getAllByTestId("footer-menu")).toHaveLength(2);
    expect(screen.getByTestId("cobrands")).toBeInTheDocument();
    expect(screen.getByTestId("footer-legal")).toBeInTheDocument();
  });

  it("uses custom right menu content when provided", () => {
    render(<FooterDesktopClient rightMenuContent={<div data-testid="custom-content">Custom</div>} />);

    expect(screen.getByTestId("custom-content")).toBeInTheDocument();
    expect(screen.getAllByTestId("footer-menu")).toHaveLength(1);
  });

  it("links logo assets back to the homepage", () => {
    render(<FooterDesktopClient />);

    const logomarkLink = screen.getByAltText("RitoVision Logomark").closest("a");
    const wordmarkLink = screen.getByAltText("RitoVision Wordmark").closest("a");

    expect(logomarkLink).toHaveAttribute("href", "/");
    expect(wordmarkLink).toHaveAttribute("href", "/");
  });
});

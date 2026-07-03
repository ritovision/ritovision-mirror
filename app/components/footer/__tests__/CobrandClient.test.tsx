import React from "react";
import { render, screen } from "@testing-library/react";

vi.mock("next/link", () => ({
  __esModule: true,
  default: ({ href, children, ...props }: { href: string | { pathname?: string }; children?: React.ReactNode } & Omit<React.ComponentProps<'a'>, 'href' | 'children'>) => (
    <a href={typeof href === "string" ? href : href?.pathname ?? ""} {...props}>
      {children}
    </a>
  ),
}));

vi.mock("@/components/utilities/media/images/OrbImage", () => ({
  __esModule: true,
  default: ({ alt, src, ...props }: React.ComponentProps<'img'>) => (
    <img alt={alt} src={src} {...props} />
  ),
}));

import CobrandClient from "../utilities/cobrands/CobrandClient";

describe("<CobrandClient />", () => {
  it("renders the co-brand heading", () => {
    render(<CobrandClient />);
    expect(screen.getByRole("heading", { name: "Co-Brands" })).toBeInTheDocument();
  });

  it("shows both cobrand logos with correct links", () => {
    render(<CobrandClient />);

    const ritography = screen.getByAltText("Ritography");
    const ritorhymes = screen.getByAltText("RitoRhymes");

    expect(ritography).toHaveAttribute("src", "/images/brand/cobrands/ritography-logo.png");
    expect(ritorhymes).toHaveAttribute("src", "/images/brand/cobrands/RitoRhymes-logo.png");

    const links = screen.getAllByRole("link");
    expect(links[0]).toHaveAttribute("href", "https://ritography.com");
    expect(links[1]).toHaveAttribute("href", "https://ritorhymes.com");
    links.forEach((link) => {
      expect(link).toHaveAttribute("target", "_blank");
      expect(link).toHaveAttribute("rel", "noopener noreferrer");
    });
  });
});

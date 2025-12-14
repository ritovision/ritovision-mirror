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

import FooterLegalClient from "../utilities/footerLegal/FooterLegalClient";

describe("<FooterLegalClient />", () => {
  it("renders privacy and terms links", () => {
    render(<FooterLegalClient />);

    expect(screen.getByText("Privacy Policy").closest("a")).toHaveAttribute("href", "/privacy");
    expect(screen.getByText("Terms of Service").closest("a")).toHaveAttribute("href", "/terms");
  });

  it("shows the expected copyright text", () => {
    render(<FooterLegalClient />);
    expect(screen.getByText("RitoVision © 2025")).toBeInTheDocument();
  });

  it("displays site attribution with external link", () => {
    render(<FooterLegalClient />);

    const siteBuilt = screen.getByText("Site Built by Rito with Next.js");
    const link = siteBuilt.closest("a");

    expect(link).toHaveAttribute("href", "https://nextjs.org");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });
});

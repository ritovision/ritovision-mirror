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

import FooterMenuClient from "../utilities/footerMenu/FooterMenuClient";

describe("<FooterMenuClient />", () => {
  const menuEntries: Record<string, string> = {
    Home: "/",
    Projects: "/projects",
    Services: "/services",
    About: "/about",
    Speaker: "/speaker",
    Press: "/press",
    Contact: "/contact",
  };

  it("renders all navigation links", () => {
    render(<FooterMenuClient />);

    Object.keys(menuEntries).forEach((label) => {
      expect(screen.getByText(label)).toBeInTheDocument();
    });
  });

  it("links point to the correct routes", () => {
    render(<FooterMenuClient />);

    Object.entries(menuEntries).forEach(([label, href]) => {
      expect(screen.getByText(label).closest("a")).toHaveAttribute("href", href);
    });
  });

  it("exposes accessible navigation landmarks", () => {
    render(<FooterMenuClient />);

    expect(screen.getByRole("navigation", { name: "Footer navigation menu" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Navigation menu section" })).toBeInTheDocument();
    expect(screen.getByText("Menu")).toBeInTheDocument();
  });
});

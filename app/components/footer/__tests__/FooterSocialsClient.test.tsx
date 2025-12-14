import React from "react";
import { render, screen } from "@testing-library/react";

vi.mock("next/link", () => ({
  __esModule: true,
  default: ({ href, children, ...props }: Omit<React.ComponentProps<"a">, "href"> & { href: string | { pathname?: string } }) => (
    <a href={typeof href === "string" ? href : href?.pathname ?? ""} {...props}>
      {children}
    </a>
  ),
}));

vi.mock("next/image", () => ({
  __esModule: true,
  default: ({ alt, src, ...props }: React.ComponentProps<"img">) => (
    <img alt={alt} src={src} {...props} />
  ),
}));

import FooterSocialsClient from "../utilities/footerSocials/FooterSocialsClient";

describe("<FooterSocialsClient />", () => {
  const socials = [
    { name: "LinkedIn", href: "https://www.linkedin.com/in/rito-matt-j-pellerito-36779084/", src: "/images/utilities/socials/linkedin-white.png" },
    { name: "Twitter", href: "https://x.com/rito_rhymes", src: "/images/utilities/socials/twitter-white.png" },
    { name: "Instagram", href: "https://instagram.com/ritorhymes", src: "/images/utilities/socials/instagram-white.png" },
    { name: "GitHub", href: "https://github.com/ritovision", src: "/images/utilities/socials/github-white.png" },
  ];

  it("renders all social links with the correct targets and icons", () => {
    render(<FooterSocialsClient />);

    socials.forEach(({ name, href, src }) => {
      const link = screen.getByRole("link", { name });
      expect(link).toHaveAttribute("href", href);
      expect(link).toHaveAttribute("target", "_blank");
      expect(link).toHaveAttribute("rel", "noopener noreferrer");

      const img = screen.getByAltText(name);
      expect(img).toHaveAttribute("src", src);
    });
  });

  it("labels the section with helper text", () => {
    render(<FooterSocialsClient />);
    expect(screen.getByText("Socials")).toBeInTheDocument();
  });
});

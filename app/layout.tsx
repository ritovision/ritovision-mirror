// app/layout.tsx
import "../styles/globals.css";
import React from 'react';
import localFont from 'next/font/local';

// Load custom local fonts
const agencyB = localFont({
  src: '../public/fonts/AGENCYB.woff',
  variable: '--font-agency',
  display: 'swap',
});

const youngAgency = localFont({
  src: '../public/fonts/YoungAgency-Regular.ttf',
  variable: '--font-young',
  display: 'swap',
});

const michroma = localFont({
  src: '../public/fonts/Michroma-Regular.ttf',
  variable: '--font-body',
  display: 'swap',
});
import ReduxProvider from "@/providers/ReduxProvider";
import TopMenu from "@/components/navigation/topMenu/TopMenuServer";
import BottomMenu from "@/components/navigation/BottomMenu";
import MainMenuServer from "@/components/navigation/mainMenu/MainMenuServer";
import ScrollHandler from "@/components/navigation/ScrollHandler";
import FooterWrapper from "@/components/footer/FooterWrapper";
import { loadJsonLdScripts } from "@/lib/jsonld/loadJsonFromIndex";
import globalJsonLdData from "@/_data/jsonld/global";
import type { Viewport } from "next";
import PixiCompatClient from "@/components/utilities/particles/PixiCompatClient";

export const dynamic = 'force-static';

export const metadata = {
  title: "RitoVision",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "contain",
  themeColor: "#012035",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${agencyB.variable} ${youngAgency.variable} ${michroma.variable}`}>
      <head>
        <link rel="icon" href="/SEO/favicon.png" />

        {/* ✅ Inject Global JSON-LD */}
        {loadJsonLdScripts(globalJsonLdData, 'global-jsonld')}
      </head>
      <body>
        {/* Mounts the PIXI CSP shim on the client without making the layout a client component */}
        <PixiCompatClient />

        <ReduxProvider>
          <TopMenu />
          <ScrollHandler />
          <div style={{ paddingTop: "60px" }}>{children}</div>
          <BottomMenu />
          <MainMenuServer />
          <FooterWrapper />
        </ReduxProvider>
      </body>
    </html>
  );
}

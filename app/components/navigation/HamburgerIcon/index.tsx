import dynamic from "next/dynamic";

const HamburgerIconClient = dynamic(() => import("./HamburgerIconClient"), {
  ssr: false, // Only renders on client side
});

export default function HamburgerIcon() {
  return <HamburgerIconClient />;
}

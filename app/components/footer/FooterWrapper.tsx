import FooterDesktopServer from "./footerDesktop/FooterDesktopServer";
import FooterMobileServer from "./footerMobile/FooterMobileServer";
import FooterWrapperClient from "./FooterWrapperClient";

export default function FooterWrapper() {
  return (
    <FooterWrapperClient
      mobileFooter={<FooterMobileServer />}
      desktopFooter={<FooterDesktopServer />}
    />
  );
}

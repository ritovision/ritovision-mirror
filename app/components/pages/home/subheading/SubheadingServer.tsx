import SubheadingOverlay from "./SubheadingClient";
import styles from "./Subheading.module.css";

export default function SubheadingServer() {
  return (
    <div className={styles.imageContainer}>
      <picture>
        {/* Desktop image when viewport is 730px or wider */}
        <source
          media="(min-width: 730px)"
          srcSet="/images/brand/logomark-wide.png"
        />
        {/* Mobile image when viewport is 729px or narrower */}
        <source
          media="(max-width: 729px)"
          srcSet="/images/brand/logomark-wide.png"
        />
        {/* Fallback */}
        <img
          src="/images/brand/logomark-wide.png"
          alt="Brand Logo"
          className={styles.backgroundImage}
        />
      </picture>
      <SubheadingOverlay />
    </div>
  );
}

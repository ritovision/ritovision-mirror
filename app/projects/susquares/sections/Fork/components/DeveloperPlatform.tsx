import styles from './DeveloperPlatform.module.css';

const platformPoints = [
  'A monorepo that preserved the legacy Jekyll root while adding six modern Node workspaces.',
  'A Hardhat-based smart-contract workspace for the primary and underlay contracts in coordination, migrated from the older setup with continuity-preserving tweaks that made customization and deployment easier.',
  'A local Besu dev chain with Blockscout so the full dApp could run end-to-end away from mainnet.',
  'A builder layer that produced vendored bundles for the static site, stabilizing Wagmi and QR dependencies and removing the brittle React-CDN Web3Modal approach the site had been leaning on.',
  'A runtime-generated site config layer so chain, RPC, and explorer settings could be injected into the static site without depending on GitHub Pages-incompatible env/plugin behavior.',
  'JSDoc annotations in the Jekyll-root JavaScript so the live site gained stronger type safety without forcing TypeScript into the legacy runtime.',
  'Storybook for staging and reviewing dApp components in isolation.',
  'Vitest and Playwright coverage for core logic, security-sensitive behavior, and end-to-end product flows.',
];

export default function DeveloperPlatform() {
  return (
    <section className={styles.section}>
      <h3 className={styles.heading}>Ecosystem-as-a-Playground Architecture</h3>
      <p className={styles.copy}>
        The technical expansion was not a sidecar. It was central to the fork&apos;s thesis.
        PR <strong>#52</strong> proposed turning the repo into something modern
        developers could meaningfully learn from while still honoring its static Jekyll
        deployment constraints. That meant wrapping the legacy site in a stronger
        architecture rather than replacing it outright.
      </p>

      <ul className={styles.list}>
        {platformPoints.map((point) => (
          <li key={point} className={styles.item}>
            {point}
          </li>
        ))}
      </ul>
    </section>
  );
}

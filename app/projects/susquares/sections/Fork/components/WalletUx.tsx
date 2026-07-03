import OrbImage from '@/components/utilities/media/images/OrbImage';
import styles from './WalletUx.module.css';

export default function WalletUx() {
  return (
    <section className={styles.section}>
      <h3 className={styles.heading}>Wallet, Account, and Transaction UX</h3>
      <p className={styles.copy}>
        One of the clearest ways the fork stopped feeling like a static artifact and
        started feeling like a modern dApp was through first-party wallet UX. Instead
        of relying on a generic, awkwardly branded modal, Rito introduced branded
        connect, account, and transaction flows that were globally available, mobile
        aware, and aligned to Su Squares&apos; product logic. That included multi-wallet
        support, better WalletConnect handling, clearer balance and network context, and
        transaction states that made the dApp experience feel intentional rather than
        bolted on.
      </p>

      <div className={styles.mediaPair}>
        <figure className={styles.figure}>
          <div className={`${styles.mediaFrame} ${styles.connectFrame}`}>
            <OrbImage
              src="/images/pages/projects/susquares/fork/su-wallet-connect-modal.png"
              alt="Su Squares branded wallet connect modal from the fork"
              fill
              sizes="(max-width: 860px) 92vw, 440px"
              radius="var(--border-radius-standard)"
              style={{ objectFit: 'contain' }}
            />
          </div>
          <figcaption className={styles.caption}>
            Branded multi-wallet connect flow that replaced the tiny generic mobile
            Web3Modal experience.
          </figcaption>
        </figure>

        <figure className={styles.figure}>
          <div className={`${styles.mediaFrame} ${styles.accountFrame}`}>
            <OrbImage
              src="/images/pages/projects/susquares/fork/su-wallet-account-modal.png"
              alt="Su Squares branded wallet account modal from the fork"
              fill
              sizes="(max-width: 860px) 92vw, 440px"
              radius="var(--border-radius-standard)"
              style={{ objectFit: 'contain' }}
            />
          </div>
          <figcaption className={styles.caption}>
            First-party account surface with network, balance, and disconnect controls.
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

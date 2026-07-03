import React from "react";
import styles from "./Pricing.module.css";

const Pricing: React.FC = () => {
  return (
    <section className={styles.section}>
      <h2 className={styles.heading}>How engagements are structured and priced</h2>

      <div className={`${styles.container} blueglow`}>
        <div className={styles.content}>
          <p>
            <strong>Fractional Leadership</strong> and <strong>Advisory</strong>{" "}
            engagements are not naturally fixed in structure. The work often
            involves exploring unknowns, clarifying ambiguity, and following the
            real cause of a problem across domains. Deadlines can be
            accommodated, but the nature of the work does not always fit neatly
            into a time-boxed container from the start.
          </p>

          <p>
            Work is purchased in <strong>10-hour retainer blocks, starting at
            $4,000 per block.</strong>
          </p>

          <p>
            Each block is organized around <strong>checkpoints</strong>,
            agreed-upon intervals or milestones where Rito reports on how time
            has been spent, provides any relevant deliverables, and sets up
            approval for the next block.
          </p>

          <p>
            Checkpoints create a clear point to clarify how time has been spent,
            what has been delivered, and what comes next, with an opportunity to
            adjust priorities or, if desired, redirect the next phase elsewhere.
          </p>

          <p>
            When the intended outputs are sufficiently clear in advance to scope
            responsibly, a <strong>fixed-rate engagement</strong> may be
            appropriate, particularly under the <strong>Studio Delivery</strong>{" "}
            model.
          </p>

          <h3 className={styles.subheading}>Client Fit Guarantee</h3>
          <p>
            Rito cares about building fruitful, lasting partnerships. It can be
            difficult to judge fit before actually working together. For the
            first <strong>10-hour block</strong>, if you feel this is not the
            right fit, whether the chemistry is off or the direction does not
            suit you, you will receive a <strong>100% refund.</strong> Rito also
            reserves the right to determine that the engagement is not the right
            fit and issue the same refund.
          </p>

          <h3 className={styles.subheading}>Alternative Compensation</h3>
          <p>Crypto equivalents to U.S. dollars may be acceptable at Rito&apos;s discretion.</p>
          <p>
            In select cases, Rito may consider a hybrid compensation structure
            that includes equity or crypto.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Pricing;

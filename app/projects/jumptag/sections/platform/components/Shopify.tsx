// \test\app\projects\jumptag\sections\platform\components\Shopify.tsx
'use client';

import React from 'react';
import styles from './Shopify.module.css';

export default function Shopify() {
  return (
    <div className={`${styles.wrapper} defaulttopspace`}>
      <h3 id="e-commerce-readiness" className={styles.title}>E-Commerce Readiness:</h3>
      <h4 className={styles.subheading}>Shopify Storefront & Launch Infrastructure</h4>

      <p className={styles.text}>
        In preparation for a potential commercial rollout, Rito designed and developed a fully branded Shopify storefront for Jumptag Club. The goal was to create a seamless e-commerce experience that aligned with the product’s visual language and fashion-forward positioning, while allowing for flexibility in inventory, fulfillment, and future campaign rollout.
      </p>

      <p className={styles.text}>
        Rather than relying on a default theme, the storefront was customized with additional front-end code and design enhancements, giving it the polish and distinction of a lifestyle brand—not a tech startup. The experience was shaped to mirror the tone of the product: sleek, minimal, modular, and user-first.
      </p>

      <p className={styles.text}>
        High-quality photography of the Jumptags adorned by models were captured by Rito himself and were integrated directly into the store layout, showcasing the product in real-world use and grounding it in authenticity and style. The product page design, collections, and user flows were tailored to communicate the product’s hybrid nature—part accessory, part platform.
      </p>

      <p className={styles.text}>
        Though the store was never formally launched, it was fully operational and positioned as a ready-to-activate channel, complete with:
      </p>

      <p className={styles.bullet}>• Configured product variants and pricing</p>
      <p className={styles.bullet}>• Integration-ready checkout and fulfillment systems</p>
      <p className={styles.bullet}>• On-brand copy, messaging, and styling</p>
      <p className={styles.bullet}>• CMS flexibility for future campaigns or seasonal drops</p>

      <p className={styles.text}>
        The Shopify build served not only as a retail foundation, but also as an extension of the Jumptag Club brand—a proof of readiness that demonstrated Rito’s ability to integrate product, design, and business infrastructure into a cohesive ecosystem.
      </p>
    </div>
  );
}

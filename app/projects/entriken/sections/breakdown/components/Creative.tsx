'use client';

import React from 'react';
import styles from './Creative.module.css';

export default function Creative() {
  return (
    <div id="creative-direction" className="defaulttopspace">
      <div className={styles.wrapper}>
        <h2 className={styles.heading}>Creative Direction</h2>

        <p className={styles.text}>
          The creative direction for William Entriken’s brand repositioning focused on projecting a future-forward yet serious persona — blending innovation with composure to reflect both his pioneering technical work and his continued service to enterprise clients and corporate environments.
        </p>
        <p className={styles.text}>
          The aesthetic strategy balanced subtle edge with deliberate restraint. The objective was not to overstate creativity at the expense of credibility, but rather to hint at multifaceted depth beneath a calm, composed exterior.
        </p>

        <h3 className={styles.redSubheading}>Visual System and Design Choices</h3>

        <h4 className={styles.subsubheading}>Color Palette</h4>
        <p className={styles.text}>
          A deep, dark blue was selected as the primary color — evoking a sense of calm, authority, and trust, appropriate for both corporate and technical audiences.
        </p>
        <p className={styles.text}>
          Accent contrasts in gold introduced a muted sense of regalness, adding dimension and sophistication without veering into ostentation.
        </p>

        <h4 className={styles.subsubheading}>Typography</h4>
        <p className={styles.text}>
          Helvetica was chosen for its clear, formal associations — reminiscent of typography found in legal and governance documents.
        </p>
        <p className={styles.text}>
          This decision anchored the brand’s contemporary visual energy with a recognizable, serious undertone, preventing the colored backgrounds from drifting into avant-garde territory.
        </p>

        <h4 className={styles.subsubheading}>Logo Design</h4>
        <p className={styles.text}>
          The logo for WilliamEntriken.net is deliberately simple: his name, set in Helvetica, one of the most universally recognized typefaces. This typographic approach acts as a visual counterweight to the complexity of his multidisciplinary work. Where his contributions span deeply technical and abstract domains, the logo offers clarity and calm — a reassuring anchor in contrast to the esoteric nature of his expertise. By using only his name, we reinforce the brand’s core strategy: positioning William himself as the recognizable, authoritative figure. This choice also aligns with the use of the domain WilliamEntriken.net, creating a cohesive and approachable personal brand across digital touchpoints, and the ".net" top level domain aligning with his technical background and consistency with phor.net.
        </p>
        <img
          src="/images/pages/projects/entriken/logos/entriken-logo.png"
          alt="William Entriken Logo"
          className={styles.centeredImage}
        />

        <h4 className={styles.subsubheading}>Visual Layering</h4>
        <p className={styles.text}>
          Subtle background shifts were introduced across different sections to suggest William’s multifaceted expertise — providing a tamed sense of variety that feels deliberate and patterned rather than chaotic or overly expressive.
        </p>

        <h4 className={styles.subsubheading}>Overall Aesthetic</h4>
        <p className={styles.text}>
          The style is intentionally simple, with clean layouts and restrained embellishments — conveying a sense of depth and humility.
        </p>
        <p className={styles.text}>
          The visual language deliberately “holds back,” creating an impression that there is more beneath the surface, reinforcing the real-world complexity and sophistication of William’s experience.
        </p>

        <h3 className={styles.redSubheading}>Summary</h3>
        <p className={styles.text}>
          The resulting creative system portrays William Entriken as a disciplined polymath: forward-looking yet grounded, innovative yet composed, capable of navigating both cutting-edge innovation and high-trust corporate environments.
        </p>
        <p className={styles.text}>
          The design aesthetic amplifies the brand’s strategic positioning — not by overwhelming audiences, but by signaling through restraint, structure, and quiet confidence.
        </p>
      </div>
    </div>
  );
}

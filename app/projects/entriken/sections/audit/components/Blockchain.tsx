'use client';

import React from 'react';
import styles from './Blockchain.module.css';

const Blockchain: React.FC = () => {
  return (
    <div id="blockchain-legacy" className={`${styles.container} defaulttopspace`}>
      <div className={styles.header}>
        <img
          src="/images/pages/projects/entriken/logos/ethereum.png"
          alt="Ethereum Logo"
          className={styles.logo}
        />
        <h2 className={styles.title}>Blockchain Legacy</h2>
      </div>

      <p className={styles.paragraph}>
        William Entriken’s contributions to blockchain technology — most notably as the lead author of ERC-721, the foundational standard for non-fungible tokens (NFTs) — have solidified his reputation as a pioneering figure in Web3 innovation.
      </p>
      <p className={styles.paragraph}>
        However, this blockchain legacy is not the result of narrow specialization. Instead, it reflects a rare fusion of expertise across the four key disciplines described above:
      </p>
      <p className={styles.listItem}>• Civic Hacking: Embracing the ethos of open-source contribution essential to decentralized ecosystems.</p>
      <p className={styles.listItem}>• Cybersecurity: Applying rigorous expertise to safeguard trustless, immutable systems.</p>
      <p className={styles.listItem}>• Finance: Leveraging deep financial literacy, including a Master’s degree in Investment Banking and real-world M&A experience.</p>
      <p className={styles.listItem}>• Solutions Architecture: Advising top technology firms and designing scalable technical frameworks.</p>

      <h4 className={styles.challengeHeading}>Challenge</h4>
      <p className={styles.paragraph}>
        Yet despite this multidimensional foundation, public perception often narrowed William’s identity to that of a “blockchain expert” or “NFT pioneer.” This reduction risked obscuring the true breadth of his capabilities — and limiting broader opportunities beyond the NFT space.
      </p>
      <p className={styles.paragraph}>
        Understanding the complexity of his background was essential to informing a more accurate and expansive brand repositioning.
      </p>

      <h3 className={styles.subheading}><em>ERC-721: The NFT Standard</em></h3>

      <h4 className={styles.challengeHeading}>Overview</h4>
      <p className={styles.paragraph}>
        William Entriken’s most significant blockchain contribution is as the lead author and principal organizer behind ERC-721, the standard that formally introduced and defined non-fungible tokens (NFTs) in blockchain nomenclature.
      </p>
      <p className={styles.paragraph}>
        Originally drafted by Dieter Shirley following the breakout success of CryptoKitties, the early development of NFT standards was fragmented — multiple competing groups pursued separate approaches to digital asset ownership on-chain. Entriken’s key contribution was unifying these efforts:
      </p>
      <p className={styles.listItem}>• He assumed leadership of the fragmented community efforts.</p>
      <p className={styles.listItem}>• Consolidated competing ideas into a single formal proposal.</p>
      <p className={styles.listItem}>• Organized a community vote to determine the final structure of the standard.</p>
      <p className={styles.listItem}>• Finalized and pushed ERC-721 through the formal Ethereum Improvement Proposal (EIP) process, also innovating improvements in how EIPs are processed.</p>
      <p className={styles.listItem}>• ERC-721 became the definitive standard for NFTs on Ethereum, setting the technical framework that underpins billions of dollars of ecosystem value today.</p>

      <h4 className={styles.challengeHeading}>Impact and Legacy</h4>
      <p className={styles.listItem}>• In 2020, ArtReview named ERC-721 the #1 most influential art entity in the world — above galleries, museums, and artists.</p>
      <p className={styles.listItem}>• During the NFT boom of 2020–2021, ERC-721 fueled the emergence of a multi-billion dollar global industry across art, gaming, finance, and culture.</p>
      <p className={styles.listItem}>• The standard inspired derivative NFT token models on Ethereum and other major blockchains, becoming a universal framework for tokenizing unique assets.</p>
      <p className={styles.listItem}>• Major cultural phenomena — including Beeple’s $69M sale at Christie’s and the rise of the Bored Ape Yacht Club (valued in billions) — were built on ERC-721 architecture.</p>
      <p className={styles.listItem}>• Hundreds of peer-reviewed academic papers have cited ERC-721, and many subsequent EIPs and blockchain standards were directly or indirectly influenced by it.</p>

      <h4 className={styles.challengeHeading}>First Full Implementation: Su Squares</h4>
      <div className={styles.suSquares}>
        <div className={styles.textBlock}>
          <p className={styles.paragraph}>
            Entriken also created and launched Su Squares, the first full reference implementation of ERC-721, in collaboration with his wife, Su. This early project served as a live demonstration of the capabilities and flexibility of the ERC-721 model.
          </p>
        </div>
        <img
          src="/images/pages/projects/entriken/susquares.png"
          alt="Su Squares"
        />
      </div>

      <h4 className={styles.challengeHeading}>Challenges and Limitations</h4>
      <p className={styles.paragraph}>
        Despite the enormous global impact of ERC-721, William Entriken did not personally capitalize financially in the way many in the crypto space did:
      </p>
      <p className={styles.listItem}>• The standard was contributed openly and without direct intellectual property ownership.</p>
      <p className={styles.listItem}>• He earned reputation and advisory opportunities, but no royalties, licensing fees, or built-in financial stakes.</p>
      <p className={styles.listItem}>• Unlike other crypto pioneers (e.g., Vitalik Buterin), Entriken’s role as a standard-bearer led to recognition in technical communities but relatively less visibility in mainstream narratives.</p>
      <p className={styles.listItem}>• The abstract, technical nature of a “software standard” — much like internet protocols such as HTML — makes the importance of his contribution difficult to communicate to general audiences.</p>
      <p className={styles.paragraph}>
        This created a unique branding challenge: Positioning William as a foundational figure in blockchain history without being overshadowed by louder, commercial success stories.
      </p>

      {/* ERC-165 Section - Content added here */}
      <h3 className={styles.subheading}><em>ERC-165: Smart Contract Foundations</em></h3>
      <p className={styles.paragraph}>
        In 2018, William Entriken co-authored ERC-165, a foundational Ethereum standard that enables smart contracts to communicate seamlessly across decentralized applications (dApps) and FinTech ecosystems.
      </p>
      <p className={styles.paragraph}>
        Often described as a "universal translator" for the blockchain, ERC-165 provides a mechanism for smart contracts to declare and detect what interfaces they implement — a core capability underpinning billions of dollars' worth of blockchain-based systems.
      </p>

      <h4 className={styles.challengeHeading}>Role and Contribution</h4>
      <p className={styles.paragraph}>
        While William was not the lead author of ERC-165, he played a crucial role in driving the paper to completion, motivated in large part by the technical dependencies required to finalize ERC-721, the NFT standard he led.
      </p>
      <p className={styles.paragraph}>
        Recognizing that ERC-721’s success depended on reliable interoperability, William worked to ensure that the broader Ethereum ecosystem had the necessary infrastructure to support emerging asset standards.
      </p>

      <h4 className={styles.challengeHeading}>Strategic Importance</h4>
      <div className={styles.techPoint}>
        <span className={styles.techTitle}>Infrastructure Leadership:</span>
        <p className={styles.techDescription}>
          William’s involvement in ERC-165 highlights his role not only as an innovator of consumer-facing standards (like NFTs) but also as a builder of critical blockchain infrastructure — the invisible frameworks that enable ecosystems to scale securely and reliably.
        </p>
      </div>
      <div className={styles.techPoint}>
        <span className={styles.techTitle}>Polymath Engineering:</span>
        <p className={styles.techDescription}>
          His ability to synthesize needs across security, finance, civic systems, and blockchain design is emblematic of his broader polymath expertise — creating solutions that bridge multiple technical domains.
        </p>
      </div>
      <div className={styles.techPoint}>
        <span className={styles.techTitle}>Strategic Foresight:</span>
        <p className={styles.techDescription}>
          By proactively addressing ERC-721’s technical dependencies through ERC-165, William demonstrated strategic foresight — solving systemic issues before they became bottlenecks for the ecosystem’s growth.
        </p>
      </div>
      <div className={styles.techPoint}>
        <span className={styles.techTitle}>Ecosystem-Wide Impact:</span>
        <p className={styles.techDescription}>
          Although ERC-165 remains less publicly visible than ERC-721, its importance as a foundational interoperability layer extends beyond NFTs into decentralized finance, gaming, enterprise blockchain, and beyond.
        </p>
      </div>

    </div>
  );
};

export default Blockchain;

import React from 'react';
import { Narrative, NarrativeItem } from './Narrative';

export default function PartI() {
  const item: NarrativeItem = {
    title: "Part I: Enter Entriken",
    value: "part-1",
    content: (
      <div>
        <p>
          If you don’t know William Entriken, then you don’t know <em>blockchain</em>—and you certainly don’t know <em>NFTs</em>.
        </p>
        <br />

        <p>
          In 2021, ArtReview declared a piece of software to be the most powerful force in the global art world. That software wasn’t a tool, or a platform, or an app—it was a standard. <em>ERC-721</em>.
        </p>
        <br />

        <p>
          William Entriken is the lead author of that standard. Before “NFT” was even a term (in fact, the term was coined in the paper he authored), he saw what few others could: that digital ownership needed rules, infrastructure, and consensus to thrive. At a time when different camps were building fragmented alternatives, he asked the community to sacrifice their own competing visions to unite behind one protocol.
        </p>
        <br />

        <p>
          And he did the same. William didn’t push the “perfect” spec—he pushed the one that would bring people together. The one that would work.
        </p>
        <br />

        <p>
          That act of sacrificing personal idealism to unify a community lit the fuse for the NFT ecosystem we know today—an infrastructure now worth billions, built on the foundation he helped author.
        </p>
        <br />

        <p>
          But years later, things had changed.
        </p>
        <br />

        <p>
          The wild west had settled. Protocols had hardened. Platforms had matured. The culture was no longer about invention—it was about optimization. Efficiency. ROI.
        </p>
        <br />

        <p>
          And that’s when William had a new vision—one that he shared with the members of his weekly Community Service Hour chat sessions. This vision for a new ERC, a new standard, would forever change tokenomics on the Ethereum blockchain and level the playing field among dogs big and small.
        </p>
        <br />

        <p>
          <em>"If anyone has connections with or is Facebook friends with a leader in a major NFT marketplace, please let them know we can work together to implement this. We can change the game forever!"</em>
        </p>
        <br />

        <p>
          It wasn't a plan. It wasn't a proposal. But for Rito, it was the starting gun for a voyage of absurd ambition.
        </p>
        <br />
      </div>
    )
  };

  return <Narrative item={item} />;
}

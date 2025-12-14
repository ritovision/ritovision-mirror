// app\projects\cod\sections\coverage\Helicopter.tsx
'use client'

import React from 'react'
import Coverage from '../../components/Coverage'
import Dropdown from '@/components/utilities/dropdown/Dropdown'
import Image from 'next/image'

export default function Helicopter() {
  // Links for dropdown
  const links: Record<string, string> = {
    Dexerto: 'https://www.dexerto.com/call-of-duty/explosive-warzone-bug-causes-helicopters-to-self-destruct-out-of-nowhere-1681693/',
    GameRant: 'https://web.archive.org/web/20211023225040/https://gamerant.com/call-of-duty-warzone-exploding-helicopters-rebirth-bug-video/',
    'Esports.com': 'https://www.esports.com/de/warzone-helikopter-bug-hier-solltet-ihr-besser-nicht-landen-288485',
    'Mein-MMO': 'https://mein-mmo.de/cod-warzone-anti-heli-zone-vorsicht/',
  }

  const handleDropdownChange = (label: string) => {
    const url = links[label]
    if (url) window.open(url, '_blank', 'noopener,noreferrer')
  }

  return (
    <Coverage
      id="case-ii-self-destructing-choppers"
      topOutsideText="Case II"
      topInsideText="Self-Destructing Choppers"
      videoUrl="https://youtu.be/IWduukB7t0g?si=DWC-b2LsiEDhGZOB"
    >
      <p>
        In another widely-circulated campaign, Rito uncovered and elevated a bizarre Warzone bug that caused helicopters to explode instantly when landing in specific zones on Rebirth Island—without taking any visible damage or enemy fire. The glitch had game-breaking implications for players relying on air mobility, but instead of documenting it in a dry, technical manner, Rito chose a dramatically different route.
      </p>
      <br /><br />
      <p>
        To make the bug unforgettable, he created a satirical video set to the energetic overture of La Traviata. Using a blend of humor, classical flair, and sharp timing, the video showcased a series of chaotic helicopter explosions across multiple landing zones—each more absurd and unpredictable than the last. What made the piece truly infotaining, however, was Rito’s commitment to detail: extensively mapping out the “death zones” on Rebirth Island and marking the exact areas where landings would trigger the glitch.
      </p>

      <figure
        style={{
          margin: '2rem auto',
          width: '80%',
          maxWidth: '400px',
          textAlign: 'center'
        }}
      >
        <Image
          src="/images/pages/projects/cod/chopper-map.png"
          alt="Rebirth Island death zones map"
          width={400}
          height={300}
          style={{ width: '100%', height: 'auto', display: 'block' }}
        />
        <figcaption
          style={{
            fontFamily: 'AgencyB, sans-serif',
            marginTop: '0.5rem',
            fontSize: '0.9rem',
            color: 'white'
          }}
        >
          Rito’s map of glitch locations
        </figcaption>
      </figure>

      <br /><br />
      <p>
        The content struck a balance between entertainment and utility—delivering a laugh while providing real strategic insight for players trying to avoid instant death. The opera, the carnage, and the unexpected comedic framing caught the attention of several gaming outlets, including GameRant, which featured the video in a detailed breakdown of the issue.
      </p>
      <br /><br />
      <blockquote>
        “YouTuber Rito Rhymes showed a montage of several unfair deaths... the combination of the song and exploding helicopters makes for an entertaining clip.”<br/>
        — GameRant
      </blockquote>
      <br /><br />
      <p>
        Beyond the laugh, the video created pressure. Players began sharing it to warn each other. Comment threads filled with anecdotes of similar experiences. What began as a mysterious, unlisted glitch quickly became a known hazard—because Rito turned chaos into culture.
      </p>

      <div style={{ display: 'flex', justifyContent: 'center', margin: '1.5rem 0 0' }}>
        <Dropdown
          headerText="Check out the articles"
          items={Object.keys(links)}
          onChange={handleDropdownChange}
        />
      </div>
    </Coverage>
  )
}

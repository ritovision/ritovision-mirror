// app\projects\cod\sections\coverage\RiotShield.tsx
'use client'

import React from 'react'
import Coverage from '../../components/Coverage'
import Dropdown from '@/components/utilities/dropdown/Dropdown'

export default function RiotShield() {
  // Links for dropdown
  const links: Record<string, string> = {
    ScreenRant: 'https://screenrant.com/cod-warzone-riot-shield-disappear-glitch-rap-video/',
    GameRant: 'https://gamerant.com/call-of-duty-warzone-bug-is-randomly-removing-riot-shields/',
    Dexerto: 'https://www.dexerto.com/call-of-duty/bizarre-warzone-glitch-steals-riot-shields-from-players-mid-game-1707837/',
  }

  const handleDropdownChange = (label: string) => {
    const url = links[label]
    if (url) window.open(url, '_blank', 'noopener,noreferrer')
  }

  return (
    <Coverage
      id="case-i-vanishing-riot-shield"
      topOutsideText="Case I"
      topInsideText="Vanishing Riot Shield"
      videoUrl="https://www.youtube.com/watch?v=c7pHn3WCi4k"
    >
      <p>
        Among the most widely shared pieces from the campaign was Rito’s investigation into a persistent and highly specific Warzone glitch: a bug causing Riot Shields to disappear when players were downed inside vehicles and then revived. The issue had been reported in fragments across community channels for over a year, but no one had tied the pieces together—until now.
      </p><br /><br />
      <p>
        To accurately demonstrate the bug’s activation conditions, Rito recruited an additional player to assist with live testing scenarios. The glitch required precise steps involving passenger seating, knockdowns, revives, and inventory interactions—making it a coordinated two-person QA effort. Rito documented every variation through detailed in-game captures, ensuring clarity around when and how the bug could be reliably triggered.
      </p><br /><br />
      <p>
        Once captured, the footage was transformed into a tightly edited, infotainment-style video using Adobe Premiere. But this time, Rito introduced a creative twist: performing and recording a custom rap under his multimedia persona Rito Rhymes. The lyrics wove together technical breakdowns and comedic flair, making the video both shareable and technically credible—a rare blend.
      </p><br /><br />
      <p>
        The campaign paid off. The video was featured in a write-up by Screen Rant, one of the largest entertainment and gaming outlets in the world, which praised the video’s originality and depth. Other outlets followed, citing the bug’s persistence and the utility of Rito’s workaround, further amplifying the visibility of the issue.
      </p><br /><br />
      <blockquote>
        “The rap video, which features Rito Rhymes’ spoken-word rap over footage of the glitch in question, offers a unique yet accurate exploration of the glitch and how much it can impact players.”<br/>
        — Screen Rant
      </blockquote><br /><br />
      <p>
        For a bug that had gone largely unnoticed by the developer and ignored by official patch notes, this was the turning point—escalating a niche gameplay flaw into a widely recognized design failure, and giving players a workaround while the studio scrambled to catch up.
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

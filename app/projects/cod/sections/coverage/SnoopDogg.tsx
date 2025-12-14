// app\projects\cod\sections\coverage\SnoopDogg.tsx
'use client'

import React from 'react'
import Coverage from '../../components/Coverage'
import Dropdown from '@/components/utilities/dropdown/Dropdown'

export default function SnoopDogg() {
  // Links for dropdown
  const links: Record<string, string> = {
    Gfinity: 'https://www.gfinityesports.com/article/snoop-dogg-head-disappear',
    'Charlie Intel': 'https://www.charlieintel.com/call-of-duty-warzone/crazy-warzone-bug-makes-snoop-dogg-operator-impossible-to-headshot-177193/',
    DBLTAP: 'https://web.archive.org/web/20221203090109/https://www.dbltap.com/posts/warzone-bug-comically-makes-snoop-dogg-skin-s-head-invisible-01g3c3c3q8tq',
    Dexerto: 'https://www.dexerto.com/call-of-duty/bizarre-warzone-bug-makes-hitting-headshots-on-snoop-dogg-impossible-1826048/',
  }

  const handleDropdownChange = (label: string) => {
    const url = links[label]
    if (url) window.open(url, '_blank', 'noopener,noreferrer')
  }

  return (
    <Coverage
      id="case-iii-snoop-doggs-vanishing-head"
      topOutsideText="Case III"
      topInsideText="Snoop Dogg's Vanishing Head"
      videoUrl="https://youtu.be/IYgLEzudiw0"
    >
      <p>
        During Warzone Pacific Season 3, Rito uncovered a bug that caused the "Snoop Dogg" character skin’s head to disappear entirely when using a specific weapon configuration. Though players could still land headshots, the missing visual dramatically reduced visibility—giving users of the skin a clear gameplay advantage.
      </p><br /><br />
      <p>
        Rito published the clip directly to the Warzone subreddit under the name ritorhymes, demonstrating how equipping the Akimbo Top Break pistols would trigger the visual glitch, with the head reappearing only when switching to a shield. The post was framed for clarity and viral potential, showing the bug in action without overexplaining—allowing it to speak for itself.
      </p><br /><br />
      <p>
        The video was picked up by multiple gaming news outlets, including Dexerto, which featured the clip and broke down its competitive implications:
      </p><br /><br />
      <blockquote>
        “Reddit user ‘ritorhymes’ highlighted this glitch in the Warzone Pacific subreddit, and the clip they posted showed the Snoop Dog Operator’s head disappearing after equipping the Top Break Pistol.”
      — <em>Dexerto</em>
      </blockquote><br /><br />
      <p>
        This entry in the campaign demonstrated that not all coverage needs extensive production—just smart timing, platform fluency, and a sharp eye for which glitches would resonate with both players and the press. Even without a soundtrack or cinematic overlay, Rito turned a small moment into a media-worthy artifact by being first, clear, and undeniable. 
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

// app\projects\cod\sections\coverage\Hacker.tsx
'use client'

import React from 'react'
import Coverage from '../../components/Coverage'
import Button from '@/components/utilities/buttons/Button'

export default function Hacker() {
  return (
    <Coverage
      id="bonus-case-beating-a-cheater"
      topOutsideText="BONUS | Case IV"
      topInsideText="Beating a Cheater"
      videoUrl="https://youtu.be/VRHyolwoZ2M"
    >
      <p>
        While this campaign didn’t expose a specific bug, it showcased another major vulnerability in Warzone’s ecosystem: the prevalence of cheating. In a match on Rebirth Resurgence, Rito and his squad encountered a hacker wielding a full suite of cheats—wallhacks, aim assist, and movement enhancements—systematically eliminating the entire team in the final circle.
      </p><br /><br />
      <p>
        What followed was a one-on-one confrontation between a fully kitted cheater and Rito, armed only with a riot shield, gas grenades, thermite, and his tactical wits. Instead of giving up or glitching out, Rito engaged strategically—baiting reloads, blocking shots, applying pressure with tacticals, and finally downing the hacker. Before the finishing blow could land, the hacker rage-quit.
      </p><br /><br />
      <p>
        Rito shared the clip to Reddit under the ritorhymes handle and followed up with tactical commentary in an email to Dexerto, which published a full article on the encounter. His advice offered players a real toolkit to counteract cheaters in high-pressure endgame scenarios—using patience, timing, and specific loadout mechanics to turn the tide.
      </p><br /><br />
      <blockquote>
        “Use the Amped perk to minimize the time your shield is lowered and vulnerable… Thermites are one of the quickest lethals you can throw... If they continuously fire at your shield, try to catch them on the reload.”<br/>
        — Rito to <em>Dexerto</em>
      </blockquote><br /><br />
      <p>
        While this wasn’t traditional QA or media pressure, it was a strong signal that creative, player-driven resilience could offer value even in environments compromised by exploits. Rito turned a hacked lobby into a teachable moment and a media moment—both at once.
      </p>

      <div style={{ marginTop: '1.5rem', width: '50%', margin: '1.5rem auto 0' }}>
        <Button
          text="Dexerto Article"
          href="https://www.dexerto.com/call-of-duty/warzone-hero-makes-hacker-rage-quit-after-epic-riot-shield-1v1-1650745/"
        />
      </div>
    </Coverage>
  )
}

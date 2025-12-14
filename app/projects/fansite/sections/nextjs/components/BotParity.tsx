'use client'

import React from 'react'
import PlainContainer from '@/projects/components/PlainContainer'
import styles from './BotParity.module.css'

export default function BotParity() {
  return (
    <PlainContainer id="bot-parity" title="Bot Parity & Edge Orchestration">
      <p>
        AFL also includes a Bot Parity Layer (BPL): a pre-rendered mirror of each page where every hero image, carousel, and copy block is assembled ahead of time. Bots, AI assistants, and low-spec devices get the full experience instantly, with no client-side randomization or JavaScript gatekeeping, so they can digest the brand story without missing media. Incremental Static Regeneration quietly rotates those bot copies on a set cadence, delivering fresh creative over time while keeping every response deterministic. The business result: consistent indexing, richer AI summaries, and zero manual “keep it fresh” tasks.
      </p>
      <img
        src="/images/pages/projects/fansite/bot-vs-user.svg"
        alt="Bot versus user parity diagram"
        className={styles.diagram}
        loading="lazy"
      />
      <p>
        The Orchestration Layer of Rewrites (OLR) coordinates that routing logic. Edge fingerprints decide who should see which experience, SmartLink manages client-side navigation so anyone already in the bot view keeps canonical URLs while fetching bot content, and PerformanceDetector routes low-powered devices to the lighter bot layer for a smoother experience. History updates mask the swap so parity feels invisible to humans, yet precise enough for AI crawlers.
      </p>
      <img
        src="/images/pages/projects/fansite/ORL.svg"
        alt="Orchestration Layer of Rewrites diagram"
        className={styles.diagram}
        loading="lazy"
      />
      <p>
        Underneath it all, Vercel-native automations refresh provider IP intelligence, revalidate ISR targets, and warm caches on a predictable cadence, keeping both human and bot experiences synchronized without manual ops. It’s an autonomous protection loop for SEO, AI discoverability, and overall site health, which lets a single strategist-engineer run a celebrity property with enterprise-grade resilience.
      </p>
    </PlainContainer>
  )
}

'use client'
import React from 'react'
import Seo from './components/Seo'
import Content from './components/Content'
import StaticSite from './components/StaticSite'
import BotParity from './components/BotParity'
import RedHeader from '@/components/utilities/sections/RedHeader'

export default function Nextjs() {
  return (
    <section className="defaultbottomspace">
      <RedHeader id="nextjs">Latest Site Version with Next.js</RedHeader>
      <StaticSite />
      <Content />
      <BotParity />
      <Seo />
    </section>
  )
}

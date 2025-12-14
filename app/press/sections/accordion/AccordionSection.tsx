'use client'
import React from 'react'
import { BigAccordion } from '@/components/utilities/accordion/BigAccordion'
import QuickBio from '@/press/components/QuickBio'
import FactSheet from '@/press/components/FactSheet'
import RitoImages from '@/press/components/RitoImages'
import BrandAssets from '@/press/components/BrandAssets'
import Quotes from '@/press/components/Quotes'
import styles from './accordion.module.css'

const accordionItems = [
  {
    title: 'Quick Bio',
    value: 'quick-bio',
    content: <QuickBio />,
  },
  {
    title: 'Fact Sheet',
    value: 'fact-sheet',
    content: <FactSheet />,
  },
  {
    title: 'Rito Images',
    value: 'rito-images',
    content: <RitoImages />,
  },
  {
    title: 'Quotes',
    value: 'quotes',
    content: <Quotes />,
  },
  {
    title: 'Brand Assets',
    value: 'brand-assets',
    content: <BrandAssets />,
  },
]

const AccordionSection = () => {
  return (
    <div className={styles.accordionSection}>
      <h2 className={`headingLarge ${styles.header}`}>
        Press Kit Resources
      </h2>
      <BigAccordion id="accordion" items={accordionItems} />
    </div>
  )
}

export default AccordionSection

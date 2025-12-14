'use client'
import React from 'react'
import SectionLineWrapper from '@/components/utilities/sections/SectionLineWrapper'
import PressContact from '@/press/components/PressContact'

const Contact = () => {
  return (
    <SectionLineWrapper id="contact-section" hideBottomLine>
      <PressContact id="contact" />
    </SectionLineWrapper>
  )
}

export default Contact

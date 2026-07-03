'use client';

import React from 'react';
import Domains from './components/Domains';
import Discovery from './components/Discovery';
import ImageReveal from './components/ImageReveal';
import Blockchain from './components/Blockchain';
import Phor from './components/Phor';
import Speaker from './components/Speaker';
import Press from './components/Press';
import Public from './components/Public';
import Book from './components/Book';
import Wikipedia from './components/Wikipedia';

export default function Breakdown() {
  return (
    <section>
      <Discovery />
      <ImageReveal />
      <Domains />
      <Blockchain />
      <Phor />
      <Public />
      <Speaker />
      <Book />
      <Press />
      <Wikipedia />
    </section>
  );
}

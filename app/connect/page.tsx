import React from 'react';
import { connectPageMetadata } from './metadata';
import ConnectLinkTree from './components/ConnectLinkTree';

export const metadata = connectPageMetadata;

export default function ConnectPage() {
  return <ConnectLinkTree />;
}

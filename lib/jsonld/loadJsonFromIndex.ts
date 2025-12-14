// lib/jsonld/loadJsonFromIndex.ts
import React from 'react';
import { ReactElement } from 'react';

export function loadJsonLdScripts(
  jsonLdArray: unknown[],
  idPrefix = 'jsonld'
): ReactElement<React.JSX.IntrinsicElements['script']>[] {
  return jsonLdArray.map((jsonLd, idx) =>
    React.createElement('script', {
      key: `${idPrefix}-${idx}`,
      id: `${idPrefix}-${idx}`,
      type: 'application/ld+json',
      dangerouslySetInnerHTML: { __html: JSON.stringify(jsonLd) },
    })
  );
}

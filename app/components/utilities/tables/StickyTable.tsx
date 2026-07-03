import React, { ReactNode } from 'react';
import styles from './StickyTable.module.css';

export interface StickyTableProps {
  columnWidths: Array<string | number>;
  children: ReactNode;
  className?: string;
  wrapperClassName?: string;
  ariaLabel?: string;
}

const toCssWidth = (width: string | number) =>
  typeof width === 'number' ? `${width}px` : width;

export default function StickyTable({
  columnWidths,
  children,
  className = '',
  wrapperClassName = '',
  ariaLabel,
}: StickyTableProps) {
  const tableClassName = [styles.table, className].filter(Boolean).join(' ');
  const wrapperClasses = [styles.wrapper, wrapperClassName].filter(Boolean).join(' ');

  return (
    <div className={wrapperClasses}>
      <table className={tableClassName} aria-label={ariaLabel}>
        <colgroup>
          {columnWidths.map((width, index) => {
            const cssWidth = toCssWidth(width);
            return <col key={`${cssWidth}-${index}`} style={{ width: cssWidth }} />;
          })}
        </colgroup>
        {children}
      </table>
    </div>
  );
}

import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import type { ComponentProps } from 'react';
import StickyTable from '../StickyTable';

type LinkItem = {
  label: string;
  url: string;
};

type TableRow = {
  project: string;
  improvement: string;
  prs: LinkItem[];
  issues: LinkItem[];
  tags: string[];
};

const columnWidths = [200, 380, 140, 140, 220];

const rows: TableRow[] = [
  {
    project: 'Ethereum EIPs',
    improvement:
      'Fixed mobile overflow across 100+ pages by updating shared layout rules and overflow handling.',
    prs: [
      { label: '#10358', url: 'https://github.com/ethereum/EIPs/pull/10358' },
      { label: '#1245', url: 'https://github.com/ethereum/ERCs/pull/1245' },
    ],
    issues: [{ label: '#10357', url: 'https://github.com/ethereum/EIPs/issues/10357' }],
    tags: ['site-wide', 'mobile optimization', 'EIPs'],
  },
  {
    project: 'LangChain',
    improvement:
      'Rebalanced the docs header and added a mobile-friendly API version selector.',
    prs: [{ label: '#8942', url: 'https://github.com/langchain-ai/langchainjs/pull/8942' }],
    issues: [],
    tags: ['navigation', 'developer experience', 'branding'],
  },
  {
    project: 'OWASP Top 10',
    improvement:
      'Resolved a release-candidate watermark that broke mobile layouts across the site.',
    prs: [{ label: '#878', url: 'https://github.com/OWASP/Top10/pull/878' }],
    issues: [{ label: '#877', url: 'https://github.com/OWASP/Top10/issues/877' }],
    tags: ['mobile optimization', 'site-wide'],
  },
];

const renderLinks = (links: LinkItem[]) => {
  if (links.length === 0) {
    return 'N/a';
  }

  return links.map((link, index) => (
    <span key={link.url}>
      <a href={link.url} target="_blank" rel="noreferrer noopener">
        {link.label}
      </a>
      {index < links.length - 1 ? ', ' : ''}
    </span>
  ));
};

const TableCanvas = (args: ComponentProps<typeof StickyTable>) => (
  <div
    style={{
      minHeight: '100vh',
      padding: '48px 16px',
      background: 'linear-gradient(135deg, #050b14 0%, #0b1a2c 55%, #101c2e 100%)',
      color: '#eef4ff',
    }}
  >
    <StickyTable {...args}>
      <thead>
        <tr>
          <th>Project Name</th>
          <th>Improvement</th>
          <th>Pull Request(s)</th>
          <th>Issue(s)</th>
          <th>Tags</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr key={row.project}>
            <td>{row.project}</td>
            <td>{row.improvement}</td>
            <td>{renderLinks(row.prs)}</td>
            <td>{renderLinks(row.issues)}</td>
            <td>{row.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </StickyTable>
  </div>
);

const meta = {
  title: 'Utilities/Tables/StickyTable',
  component: StickyTable,
  args: {
    columnWidths,
    className: 'blueglow',
    ariaLabel: 'Open source contribution table',
    children: null,
  },
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof StickyTable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: null,
  },
  render: (args) => <TableCanvas {...args} />,
};

export const DenseColumns: Story = {
  name: 'Dense columns',
  args: {
    columnWidths: [160, 300, 120, 120, 180],
    children: null,
  },
  render: (args) => <TableCanvas {...args} />,
};

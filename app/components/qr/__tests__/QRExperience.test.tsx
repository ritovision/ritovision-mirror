import React from 'react';
import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import QRExperience from '@/components/qr/QRExperience';
import { getQrCodeProfiles } from '@/lib/qrCodes';

const pushMock = vi.fn();
let pathnameMock = '/qr/site-links';

vi.mock('next/navigation', () => ({
  usePathname: () => pathnameMock,
  useRouter: () => ({
    push: pushMock,
  }),
}));

vi.mock('qrcode.react', () => ({
  QRCodeSVG: ({
    value,
    fgColor,
    bgColor,
    marginSize,
  }: {
    value: string;
    fgColor: string;
    bgColor: string;
    marginSize: number;
  }) => (
    <svg
      data-testid="qr-code"
      data-value={value}
      data-fg={fgColor}
      data-bg={bgColor}
      data-margin={marginSize}
    />
  ),
}));

vi.mock('@/components/utilities/media/images/OrbImage', () => ({
  default: ({ alt = '' }: { alt?: string }) => <img alt={alt} />,
}));

const storageKey = 'ritovision:qr-customizer:v1';
const profiles = getQrCodeProfiles();

describe('QRExperience', () => {
  beforeEach(() => {
    pushMock.mockClear();
    pathnameMock = '/qr/site-links';
    window.localStorage.clear();
  });

  it('renders config defaults when no local override exists', () => {
    render(<QRExperience profiles={profiles} activeSlug="site-links" />);

    expect(screen.getByTestId('qr-layout-default')).toBeInTheDocument();
    expect(screen.getByTestId('qr-code')).toHaveAttribute(
      'data-value',
      'https://ritovision.com'
    );
    expect(screen.getByTestId('qr-code')).toHaveAttribute('data-fg', '#ffffff');
    expect(screen.getByTestId('qr-code')).toHaveAttribute('data-bg', 'transparent');
    expect(screen.getByTestId('qr-code')).toHaveAttribute('data-margin', '4');
  });

  it('applies a stored per-profile override', async () => {
    window.localStorage.setItem(
      storageKey,
      JSON.stringify({
        'site-links': {
          layout: 'poster',
          colorTheme: 'scanner',
          imageKey: 'rito-ceo',
        },
      })
    );

    render(<QRExperience profiles={profiles} activeSlug="site-links" />);

    await waitFor(() => {
      expect(screen.getByTestId('qr-layout-poster')).toBeInTheDocument();
    });

    expect(screen.getByAltText('Rito in a suit')).toBeInTheDocument();
    expect(screen.getByTestId('qr-code')).toHaveAttribute('data-fg', '#000000');
    expect(screen.getByTestId('qr-code')).toHaveAttribute('data-bg', '#ffffff');
  });

  it('routes to the selected QR profile', () => {
    render(<QRExperience profiles={profiles} activeSlug="site-links" />);

    fireEvent.click(screen.getByRole('button', { name: /^site links$/i }));
    fireEvent.click(screen.getByRole('option', { name: /rito rhymes/i }));

    expect(pushMock).toHaveBeenCalledWith('/qr/music');
  });

  it('updates the site-links QR without routing', () => {
    render(<QRExperience profiles={profiles} activeSlug="site-links" />);

    const layout = screen.getByTestId('qr-layout-default');
    fireEvent.click(screen.getByRole('button', { name: /show qr controls/i }));
    const siteLinkButton = screen.getByRole('button', { name: /^home$/i });

    expect(
      layout.compareDocumentPosition(siteLinkButton) &
        Node.DOCUMENT_POSITION_FOLLOWING
    ).toBeTruthy();

    fireEvent.click(siteLinkButton);
    fireEvent.click(screen.getByRole('option', { name: /^press$/i }));

    expect(pushMock).not.toHaveBeenCalled();
    expect(screen.getByTestId('qr-code')).toHaveAttribute(
      'data-value',
      'https://ritovision.com/press'
    );
    expect(window.localStorage.getItem(storageKey)).toContain(
      '"siteLinkPath":"/press"'
    );
  });

  it('updates the RitoSwap destination without routing', () => {
    render(<QRExperience profiles={profiles} activeSlug="ritoswap" />);

    const layout = screen.getByTestId('qr-layout-logo-stack');
    expect(layout).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /^docs$/i })).toBeInTheDocument();
    expect(within(layout).queryByText('RitoSwap')).not.toBeInTheDocument();
    expect(screen.getByAltText('RitoSwap')).toBeInTheDocument();
    expect(screen.getByTestId('qr-code')).toHaveAttribute(
      'data-value',
      'https://docs.ritoswap.com'
    );

    fireEvent.click(screen.getByRole('button', { name: /show qr controls/i }));
    fireEvent.click(screen.getByRole('button', { name: /^docs$/i }));
    fireEvent.click(screen.getByRole('option', { name: /^storybook$/i }));

    expect(pushMock).not.toHaveBeenCalled();
    expect(screen.getByRole('heading', { name: /^storybook$/i })).toBeInTheDocument();
    expect(screen.getByTestId('qr-code')).toHaveAttribute(
      'data-value',
      'https://ui.ritoswap.com'
    );
    expect(window.localStorage.getItem(storageKey)).toContain(
      '"destinationOptionKey":"storybook"'
    );
  });

  it('renders the Ritography QR profile with its logo', () => {
    render(<QRExperience profiles={profiles} activeSlug="ritography" />);

    expect(screen.getByTestId('qr-layout-logo-stack')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /^ritography$/i })).toBeInTheDocument();
    expect(screen.getByAltText('Ritography')).toBeInTheDocument();
    expect(screen.getByTestId('qr-code')).toHaveAttribute(
      'data-value',
      'https://ritography.com'
    );
  });

  it('shows QR Home first and routes it to /qr', () => {
    render(<QRExperience profiles={profiles} activeSlug="site-links" />);

    const selectorButton = screen.getByRole('button', { name: /^site links$/i });
    const layout = screen.getByTestId('qr-layout-default');

    expect(
      selectorButton.compareDocumentPosition(layout) &
        Node.DOCUMENT_POSITION_FOLLOWING
    ).toBeTruthy();

    fireEvent.click(selectorButton);

    const options = screen.getAllByRole('option');
    expect(options[0]).toHaveTextContent('QR Home');

    fireEvent.click(options[0]);
    expect(pushMock).toHaveBeenCalledWith('/qr');
  });

  it('selects QR Home on the /qr page', () => {
    pathnameMock = '/qr';

    render(<QRExperience profiles={profiles} activeSlug="site-links" />);

    expect(screen.getByRole('button', { name: /^qr home$/i })).toBeInTheDocument();
  });

  it('resets the active profile override', async () => {
    window.localStorage.setItem(
      storageKey,
      JSON.stringify({
        'site-links': {
          layout: 'poster',
          colorTheme: 'scanner',
          imageKey: 'rito-ceo',
        },
      })
    );

    render(<QRExperience profiles={profiles} activeSlug="site-links" />);

    await waitFor(() => {
      expect(screen.getByTestId('qr-layout-poster')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByRole('button', { name: /show qr controls/i }));
    fireEvent.click(screen.getByRole('button', { name: /reset site links/i }));

    await waitFor(() => {
      expect(screen.getByTestId('qr-layout-default')).toBeInTheDocument();
    });

    expect(window.localStorage.getItem(storageKey)).toBeNull();
  });
});

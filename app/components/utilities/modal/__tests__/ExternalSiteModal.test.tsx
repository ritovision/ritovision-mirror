import { fireEvent, render, screen } from '@testing-library/react';
import ExternalSiteModal from '../ExternalSite';

const originalLocation = window.location;

describe('ExternalSiteModal', () => {
  let hrefSet: string | null;

  beforeEach(() => {
    hrefSet = null;
    Object.defineProperty(window, 'location', {
      configurable: true,
      writable: true,
      value: {
        ...originalLocation,
        get href() {
          return hrefSet ?? 'http://localhost/';
        },
        set href(value: string) {
          hrefSet = value;
        },
      },
    });
  });

  afterAll(() => {
    Object.defineProperty(window, 'location', {
      configurable: true,
      writable: true,
      value: originalLocation,
    });
  });

  it('renders default message and actions', () => {
    render(<ExternalSiteModal isOpen onClose={vi.fn()} url="https://example.com" />);

    expect(screen.getByText(/about to leave RitoVision\.com/i)).toBeInTheDocument();
    expect(screen.getByText('Leave')).toBeInTheDocument();
    expect(screen.getByText('Stay')).toBeInTheDocument();
  });

  it('calls onClose when Stay is clicked', () => {
    const onClose = vi.fn();
    render(<ExternalSiteModal isOpen onClose={onClose} url="https://example.com" />);

    fireEvent.click(screen.getByText('Stay'));
    expect(onClose).toHaveBeenCalledTimes(1);
    expect(hrefSet).toBeNull();
    expect(window.open).not.toHaveBeenCalled();
  });

  it('opens the link in a new window when requested', () => {
    const onClose = vi.fn();
    const openSpy = vi.spyOn(window, 'open');
    render(
      <ExternalSiteModal
        isOpen
        onClose={onClose}
        url="https://example.com"
        openInNewWindow
      />,
    );

    fireEvent.click(screen.getByText('Leave'));
    expect(openSpy).toHaveBeenCalledWith('https://example.com', '_blank');
    expect(onClose).toHaveBeenCalledTimes(1);
    expect(hrefSet).toBeNull();
  });

  it('navigates in the same tab by default', () => {
    const onClose = vi.fn();
    const openSpy = vi.spyOn(window, 'open');
    render(<ExternalSiteModal isOpen onClose={onClose} url="https://example.com" />);

    fireEvent.click(screen.getByText('Leave'));
    expect(hrefSet).toBe('https://example.com');
    expect(openSpy).not.toHaveBeenCalled();
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});

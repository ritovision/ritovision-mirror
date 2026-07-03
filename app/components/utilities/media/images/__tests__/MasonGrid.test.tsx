import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import MasonGrid from '../MasonGrid';
import lightboxStyles from '../Lightbox.module.css';

const { fileSpy, folderSpy, generateAsync, mockZipCtor } = vi.hoisted(() => {
  const fileSpy = vi.fn();
  const folderSpy = vi.fn(() => ({ file: fileSpy }));
  const generateAsync = vi.fn(() => Promise.resolve(new Blob(['zip'])));
  const mockZipCtor = vi.fn(() => ({
    folder: folderSpy,
    generateAsync,
  }));
  return { fileSpy, folderSpy, generateAsync, mockZipCtor };
});

vi.mock('jszip', () => ({
  __esModule: true,
  default: mockZipCtor,
}));

describe('MasonGrid', () => {
  const items = [
    { src: '/image1.png', alt: 'Grid One' },
    { src: '/image2.jpg', alt: 'Grid Two' },
  ];

  let fetchMock: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    fileSpy.mockClear();
    folderSpy.mockClear();
    generateAsync.mockClear();
    mockZipCtor.mockClear();

    fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      blob: () => Promise.resolve(new Blob(['image'])),
    });
    (global as typeof globalThis).fetch = fetchMock as typeof fetch;
    (global as typeof globalThis).URL.createObjectURL = vi.fn(() => 'blob:mock');
    (global as typeof globalThis).URL.revokeObjectURL = vi.fn();
  });

  it('opens the Lightbox and cycles images via next/prev', async () => {
    render(<MasonGrid items={items} />);

    fireEvent.click(screen.getByAltText(items[0].alt));

    const lightboxImage = await waitFor(() =>
      document.body.querySelector(`.${lightboxStyles.lightboxImage}`)
    );
    expect(lightboxImage).toHaveAttribute('src', items[0].src);

    fireEvent.click(screen.getByRole('button', { name: /next/i }));
    await waitFor(() => {
      const updated = document.body.querySelector(
        `.${lightboxStyles.lightboxImage}`
      );
      expect(updated).toHaveAttribute('src', items[1].src);
    });

    fireEvent.click(screen.getByRole('button', { name: /previous/i }));
    await waitFor(() => {
      const updated = document.body.querySelector(
        `.${lightboxStyles.lightboxImage}`
      );
      expect(updated).toHaveAttribute('src', items[0].src);
    });
  });

  it('downloads all images into a zip', async () => {
    render(<MasonGrid items={items} />);

    fireEvent.click(screen.getByRole('button', { name: /download all/i }));

    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalledTimes(items.length);
      expect(folderSpy).toHaveBeenCalledWith('rito-images');
      expect(fileSpy).toHaveBeenNthCalledWith(
        1,
        'image-1.png',
        expect.any(Blob)
      );
      expect(fileSpy).toHaveBeenNthCalledWith(
        2,
        'image-2.jpg',
        expect.any(Blob)
      );
      expect(generateAsync).toHaveBeenCalled();
    });
  });
});

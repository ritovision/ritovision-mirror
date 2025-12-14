import { fireEvent, render, screen } from '@testing-library/react';
import Modal from '../Modal';
import { Modal as ModalFromIndex, ExternalSiteModal } from '../index';
import styles from '../Modal.module.css';

describe('Modal', () => {
  it('returns null when closed', () => {
    render(
      <Modal isOpen={false} onClose={vi.fn()}>
        <p>Hidden content</p>
      </Modal>,
    );

    expect(screen.queryByText('Hidden content')).not.toBeInTheDocument();
  });

  it('renders when open and applies the variant classes', () => {
    render(
      <Modal isOpen onClose={vi.fn()} variant="primaryBlue">
        <p>Visible content</p>
      </Modal>,
    );

    const modal = screen.getByText('Visible content').parentElement;
    expect(modal).toHaveClass(styles.modalContainer);
    expect(modal).toHaveClass(styles.primaryBlue);
  });

  it('invokes onClose on outside click', () => {
    const onClose = vi.fn();
    render(
      <Modal isOpen onClose={onClose}>
        <p>Click outside</p>
      </Modal>,
    );

    fireEvent.mouseDown(document.body);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('invokes onClose on beforeunload', () => {
    const onClose = vi.fn();
    render(
      <Modal isOpen onClose={onClose}>
        <p>Unload</p>
      </Modal>,
    );

    window.dispatchEvent(new Event('beforeunload'));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('supports inline rendering, custom classes, and inline styles', () => {
    render(
      <Modal
        isOpen
        inline
        className="custom-class"
        onClose={vi.fn()}
        style={{ width: '420px' }}
        variant="blackRed"
      >
        <p>Inline modal</p>
      </Modal>,
    );

    const modal = screen.getByText('Inline modal').parentElement;
    expect(modal).toHaveClass(styles.inline);
    expect(modal).toHaveClass(styles.blackRed);
    expect(modal).toHaveClass('custom-class');
    expect(modal).toHaveStyle({ width: '420px' });
  });
});

describe('modal/index exports', () => {
  it('re-exports the Modal and ExternalSiteModal components', () => {
    expect(ModalFromIndex).toBe(Modal);
    expect(typeof ModalFromIndex).toBe('function');
    expect(typeof ExternalSiteModal).toBe('function');
  });
});

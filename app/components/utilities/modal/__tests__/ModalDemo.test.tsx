import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import ModalDemo from '../ModalDemo';
import modalStyles from '../Modal.module.css';

describe('ModalDemo', () => {
  it('opens the success modal with the default message', () => {
    render(<ModalDemo />);

    fireEvent.click(screen.getByText('Show Success'));
    expect(
      screen.getByText('Your form submission has been received!'),
    ).toBeInTheDocument();

    const modal = document.querySelector(`.${modalStyles.modalContainer}`);
    expect(modal).toHaveClass(modalStyles.primaryBlue);
  });

  it('opens the failure modal and closes after acknowledging', async () => {
    render(<ModalDemo />);

    fireEvent.click(screen.getByText('Show Failure'));
    expect(
      screen.getByText('Form submission unsuccessful. An error has occurred.'),
    ).toBeInTheDocument();

    const modal = document.querySelector(`.${modalStyles.modalContainer}`);
    expect(modal).toHaveClass(modalStyles.blackRed);

    fireEvent.click(screen.getByText('Okay'));
    await waitFor(() =>
      expect(
        screen.queryByText('Form submission unsuccessful. An error has occurred.'),
      ).not.toBeInTheDocument(),
    );
  });
});

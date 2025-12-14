import { ButtonSectionProps } from '../ButtonSection';

const twoButtonsBlueSection: ButtonSectionProps = {
  buttonGroupProps: {
    isSingle: false,
    buttons: [
      {
        variant: 'blackButton',
        text: 'Learn More',
        href: '/learn-more',
      },
      {
        variant: 'blueAccentButton',
        text: 'Inquire Here'
        // Removed: action: () => console.log('Inquire button clicked'),
      },
    ],
  },
  title: 'Want to discuss your project goals?',
  withBackground: true,
  backgroundColor: 'var(--primary-blue)',
  textColor: 'white',
};

export default twoButtonsBlueSection;

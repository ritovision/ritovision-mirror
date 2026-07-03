import { ButtonSectionProps } from '../ButtonSection';

const oneButtonBlueSection: ButtonSectionProps = {
  buttonGroupProps: {
    isSingle: true,
    buttons: [
      {
        variant: 'blueAccentButton',
        text: 'Learn More',
        href: '/learn-more',
      },
    ],
  },
  title: 'Want to discuss your project goals?',
  withBackground: true,
  backgroundColor: 'var(--primary-blue)',
  textColor: 'white',
};

export default oneButtonBlueSection;
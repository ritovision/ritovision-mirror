// app/components/navigation/mainMenu/useMainMenuLogic.ts

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { toggleMobileMenu } from '@/store/slices/navigation/mobileModalSlice';
import { randomizeImage } from '@/store/slices/navigation/ui/imageSlice';
import { setMenuTransition } from '@/store/slices/navigation/menuTransitionSlice';
import { useSwipeToClose } from './useSwipeToClose';

function useMainMenuLogic() {
  const dispatch = useDispatch();
  const isOpen = useSelector((state: RootState) => state.mobileModal.isOpen);
  const image = useSelector((state: RootState) => state.randomImage.currentImage);

  const [mounted, setMounted] = useState(false);
  const [showImage, setShowImage] = useState(false);
  const [showButtonBackground, setShowButtonBackground] = useState(false);
  const [clickedButton, setClickedButton] = useState<string | null>(null);
  const [fadeOutButtons, setFadeOutButtons] = useState(false);
  const [triggerClose, setTriggerClose] = useState(false);

  useSwipeToClose(isOpen);

  useEffect(() => {
    setMounted(true);

    if (isOpen) {
      // Reset states when opening
      setShowImage(false);
      setShowButtonBackground(false);
      setClickedButton(null);
      setFadeOutButtons(false);
      setTriggerClose(false);

      // Immediately set showImage true; fade/scale handled in Motion component
      setShowImage(true);

      // Delay button background
      const buttonBackgroundTimer = setTimeout(() => {
        setShowButtonBackground(true);
      }, 300);

      return () => {
        clearTimeout(buttonBackgroundTimer);
      };
    }
  }, [isOpen]);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.innerWidth < 732) {
      document.body.style.overflow = isOpen ? 'hidden' : '';
    }

    if (!isOpen) {
      dispatch(randomizeImage());
    }
  }, [isOpen, dispatch]);

  useEffect(() => {
    if (!isOpen) {
      const resetTimer = setTimeout(() => {
        setShowButtonBackground(false);
      }, 500);
      return () => clearTimeout(resetTimer);
    }
  }, [isOpen]);

  const handleLinkClick = (label: string) => {
    setClickedButton(label);
    dispatch(setMenuTransition(true));

    setTimeout(() => {
      setFadeOutButtons(true);
      setTriggerClose(true);

      setTimeout(() => {
        dispatch(toggleMobileMenu(false));
      }, 1000);
    }, 500);
  };

  const handleMenuClick = () => {
    dispatch(setMenuTransition(true));
    dispatch(toggleMobileMenu(false));
  };

  const onAnimationComplete = (definition: string) => {
    if (definition === 'closed') {
      dispatch(setMenuTransition(false));
    }
  };

  return {
    mounted,
    showImage,
    showButtonBackground,
    clickedButton,
    fadeOutButtons,
    triggerClose,
    handleLinkClick,
    handleMenuClick,
    onAnimationComplete,
    isOpen,
    image
  };
}

export default useMainMenuLogic;

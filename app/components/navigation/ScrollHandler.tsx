// \test\app\components\navigation\ScrollHandler.tsx

'use client';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import throttle from 'lodash/throttle';
import { hideTopMenu, showTopMenu, showBottomMenu, hideBottomMenu } from '@/store/slices/navigation/menuSlice';
import { closeDrawer } from '@/store/slices/navigation/bottomMenuSlice';

export default function ScrollHandler() {
  const dispatch = useDispatch();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > 50) {
        dispatch(hideTopMenu());
        dispatch(showBottomMenu());
      } else {
        dispatch(showTopMenu());
        dispatch(hideBottomMenu());
        // Close drawer when bottom menu hides
        dispatch(closeDrawer());
      }
    };

    const throttledHandleScroll = throttle(handleScroll, 200);
    window.addEventListener('scroll', throttledHandleScroll);

    return () => window.removeEventListener('scroll', throttledHandleScroll);
  }, [dispatch]);

  return null;
}

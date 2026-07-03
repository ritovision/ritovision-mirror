import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { toggleDrawer } from '@/store/slices/navigation/bottomMenuSlice';

const MAX_SCROLL_ATTEMPTS = 10;
const SCROLL_RETRY_INTERVAL = 200;

export function useTocDrawer() {
  const dispatch = useDispatch();

  const handleTocLinkClick = useCallback(
    async (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault();
      dispatch(toggleDrawer('toc'));

      const targetId = href.replace('#', '');
      let attempts = 0;

      const scrollToTarget = () => {
        const target = document.getElementById(targetId);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          return true;
        }
        return false;
      };

      // Try to scroll immediately
      if (!scrollToTarget()) {
        // If target not found, retry with interval
        const retryInterval = setInterval(() => {
          attempts++;
          if (scrollToTarget() || attempts >= MAX_SCROLL_ATTEMPTS) {
            clearInterval(retryInterval);
          }
        }, SCROLL_RETRY_INTERVAL);
      }
    },
    [dispatch]
  );

  return {
    handleTocLinkClick,
  };
}

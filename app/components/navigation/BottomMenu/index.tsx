'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { usePathname } from 'next/navigation';
import { RootState } from '@/store/store';
import { bottomMenuVariants } from './bottomMenuVariants';
import { closeDrawer } from '@/store/slices/navigation/bottomMenuSlice';
import { hideBottomMenu } from '@/store/slices/navigation/menuSlice';

import { useDrawerTransition } from './hooks/useDrawerTransition';
import { useScrollToTop } from './hooks/useScrollToTop';
import { useTocValidation } from './hooks/useTocValidation';
import { useDrawerBehavior, useDrawerScrollReset, useDrawerFocusManagement } from './hooks/useDrawerBehavior';

import { BottomMenuBar } from './components/BottomMenuBar';
import { TocDrawer } from './drawers/TocDrawer/TocDrawer';
import { AiDrawer } from './drawers/AiDrawer/AiDrawer';

import styles from './BottomMenu.module.css';

const TOP_BAR_HEIGHT = 60;
const TOC_DRAWER_HEIGHT = 220;
const AI_DRAWER_HEIGHT = 400;

export default function BottomMenu() {
  const [mounted, setMounted] = useState(false);

  const drawerRef = useRef<HTMLDivElement>(null);
  const tocContentRef = useRef<HTMLDivElement>(null);
  const aiContentRef = useRef<HTMLDivElement>(null);
  const tocButtonRef = useRef<HTMLButtonElement>(null);
  const aiButtonRef = useRef<HTMLButtonElement>(null);

  const drawerRefForHooks = drawerRef as unknown as React.RefObject<HTMLElement>;
  const tocContentRefForHooks = tocContentRef as unknown as React.RefObject<HTMLElement>;
  const aiContentRefForHooks = aiContentRef as unknown as React.RefObject<HTMLElement>;
  const tocButtonRefForHooks = tocButtonRef as unknown as React.RefObject<HTMLButtonElement>;
  const aiButtonRefForHooks = aiButtonRef as unknown as React.RefObject<HTMLButtonElement>;

  const dispatch = useDispatch();
  const pathname = usePathname();

  const { hasToc, links: tocLinks } = useSelector((state: RootState) => state.toc);
  const isBottomMenuVisible = useSelector((state: RootState) => state.menu.isBottomMenuVisible);
  const activeDrawer = useSelector((state: RootState) => state.bottomMenu.activeDrawer);

  const { isAnimating: isScrollAnimating, scrollToTop } = useScrollToTop();
  const { shouldShowToc } = useTocValidation(hasToc, tocLinks.length, mounted);
  const { containerHeight, contentOpacity, contentFadeDuration, currentDrawer } = useDrawerTransition(
    activeDrawer,
    TOP_BAR_HEIGHT
  );

  useDrawerBehavior({
    isOpen: activeDrawer !== null,
    drawerRef: drawerRefForHooks,
  });

  useDrawerScrollReset({
    isOpen: activeDrawer === 'toc',
    contentRef: tocContentRefForHooks,
  });

  useDrawerScrollReset({
    isOpen: activeDrawer === 'ai',
    contentRef: aiContentRefForHooks,
  });

  useDrawerFocusManagement({
    activeDrawer,
    drawerName: 'toc',
    contentRef: tocContentRefForHooks,
    buttonRef: tocButtonRefForHooks,
  });

  useDrawerFocusManagement({
    activeDrawer,
    drawerName: 'ai',
    contentRef: aiContentRefForHooks,
    buttonRef: aiButtonRefForHooks,
  });

  useEffect(() => {
    setMounted(true);
    dispatch(closeDrawer());
    if (window.scrollY < 100) {
      dispatch(hideBottomMenu());
    }
  }, [dispatch]);

  useEffect(() => {
    dispatch(closeDrawer());
  }, [pathname, dispatch]);

  if (!mounted) return null;

  const variant = bottomMenuVariants[pathname] || bottomMenuVariants.default;

  const containerStyle: React.CSSProperties = {
    position: 'fixed',
    bottom: 0,
    width: '100%',
    height: `${containerHeight}px`,
    borderTop: '2px solid #04426C',
    borderLeft: '2px solid #04426C',
    borderRight: '2px solid #04426C',
    background: variant.color,
    boxShadow: isBottomMenuVisible
      ? '0 -4px 12px rgba(0, 0, 0, 0.4)'
      : '0 -4px 12px rgba(0, 0, 0, 0)',
    transition:
      'transform 1s cubic-bezier(0.645, 0.045, 0.355, 1), box-shadow 0.3s ease-in-out, height 0.3s ease-in-out',
    zIndex: 1000,
    transform: isBottomMenuVisible ? 'translateY(0)' : 'translateY(100%)',
    display: 'flex',
    flexDirection: 'column',
  };

  return (
    <nav
      ref={drawerRef}
      style={containerStyle}
      className={styles['bottom-menu-container']}
      role="navigation"
      aria-label="Bottom navigation menu"
    >
      <BottomMenuBar
        height={TOP_BAR_HEIGHT}
        scrollToTop={scrollToTop}
        isScrollAnimating={isScrollAnimating}
        showTocButton={shouldShowToc}
        activeDrawer={activeDrawer}
        tocButtonRef={tocButtonRefForHooks}
        aiButtonRef={aiButtonRefForHooks}
      />

      {currentDrawer === 'toc' && shouldShowToc && (
        <TocDrawer
          ref={tocContentRef}
          height={TOC_DRAWER_HEIGHT}
          opacity={contentOpacity}
          fadeDurationMs={contentFadeDuration}
        />
      )}

      {currentDrawer === 'ai' && (
        <AiDrawer
          ref={aiContentRef}
          height={AI_DRAWER_HEIGHT}
          opacity={contentOpacity}
          fadeDurationMs={contentFadeDuration}
        />
      )}
    </nav>
  );
}

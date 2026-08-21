'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

const SCROLL_KEY_PREFIX = 'educi_scroll_';

export function useScrollRestore(containerRef: React.RefObject<HTMLElement | null>) {
  const pathname = usePathname();
  const prevPathRef = useRef(pathname);

  useEffect(() => {
    if (prevPathRef.current !== pathname && containerRef.current) {
      const key = SCROLL_KEY_PREFIX + prevPathRef.current;
      sessionStorage.setItem(key, String(containerRef.current.scrollTop));
    }
    prevPathRef.current = pathname;
  }, [pathname, containerRef]);

  useEffect(() => {
    const key = SCROLL_KEY_PREFIX + pathname;
    const saved = sessionStorage.getItem(key);
    if (saved && containerRef.current) {
      requestAnimationFrame(() => {
        containerRef.current?.scrollTo({ top: Number(saved), behavior: 'instant' });
      });
    }
  }, [pathname, containerRef]);
}

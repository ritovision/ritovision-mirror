// app/hooks/navigation/useTocLinks.ts
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

export function useTocLinks() {
  const { links, hasToc } = useSelector((s: RootState) => s.toc);
  return { links, hasToc };
}

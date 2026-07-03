// app/hooks/navigation/useRegisterToc.ts
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { TocLink, registerToc, clearToc } from '@/store/slices/navigation/tocSlice';

export function useRegisterToc(links: TocLink[]) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(registerToc(links));
    return () => { dispatch(clearToc()); };
  }, [dispatch, links]);
}

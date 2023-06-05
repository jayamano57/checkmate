import { useEffect } from 'react';
import { checkService } from '@/services/check/check.service';
import { setCheckState, useCheckState } from './check.state';
import { CMCheck } from '@/services/check/check.types';

export function useCheck(): CMCheck {
  const check = useCheckState();

  useEffect(() => {
    if (!check.id) return;
    const unsub = checkService.observeCheck(check.id, setCheckState);

    return () => unsub();
  }, [check.id]);

  return check;
}

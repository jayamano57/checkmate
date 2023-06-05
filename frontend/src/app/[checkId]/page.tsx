import { Suspense } from 'react';
import { checkService } from '@/services/check/check.service';
import { CMCheck } from '@/services/check/check.types';
import { PageClient } from './page.client';
import { LoadingSkeleton } from '@/components/LoadingSkeleton/LoadingSkeleton';

async function getCheck(checkId: string): Promise<CMCheck> {
  const check = await checkService.getCheck(checkId);

  return check;
}

export default async function CheckPage({
  params: { checkId },
}: {
  params: { checkId: string };
}) {
  const check = await getCheck(checkId);

  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <PageClient check={check} />
    </Suspense>
  );
}

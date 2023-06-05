'use client';

import { CMCheck } from '@/services/check/check.types';
import { useEffect, useState } from 'react';

import { CheckEditScreen } from './CheckEditScreen';
import { CheckItemChooserScreen } from './CheckItemChooserScreen';
import { CheckContactMeScreen } from './CheckContactMeScreen';
import { setCheckState, useCheckState } from './check.state';
import { useRouter } from 'next/navigation';
import { CheckAllDoneScreen } from './CheckAllDoneScreen';
import { useCheck } from './check.hook';
import { LoadingSkeleton } from '@/components/LoadingSkeleton/LoadingSkeleton';

export type UserRole = 'buyer' | 'sender';

type CheckPageSteps =
  | 'edit'
  | 'choose.buyer'
  | 'choose.sender'
  | 'contact-me.buyer'
  | 'contact-me.sender'
  | 'all-done';

interface PageClientProps {
  check: CMCheck;
}

export function PageClient({ check }: PageClientProps) {
  const checkState = useCheck();
  const [currentStep, setCurrentStep] = useState<CheckPageSteps | null>(null);

  const goToCheckItemChooser = () => {
    setCurrentStep('choose.buyer');
  };

  const goToCheckContactMe = (role: UserRole) => {
    setCurrentStep(`contact-me.${role}`);
  };

  const goToAllDone = () => {
    {
      setCurrentStep('all-done');
    }
  };

  useEffect(() => {
    if (!check.finalized) {
      setCurrentStep('edit');
      return;
    }

    setCurrentStep('choose.sender');
  }, [check.finalized]);

  useEffect(() => {
    setCheckState(check);
  }, [check]);

  if (currentStep === null) return <LoadingSkeleton />;

  return (
    <div className="container">
      {currentStep === 'edit' && (
        <CheckEditScreen
          check={checkState}
          goToCheckItemChooser={goToCheckItemChooser}
        />
      )}
      {currentStep === 'choose.buyer' && (
        <CheckItemChooserScreen
          check={checkState}
          role="buyer"
          goToCheckContactMe={goToCheckContactMe}
        />
      )}

      {currentStep === 'choose.sender' && (
        <CheckItemChooserScreen
          check={checkState}
          role="sender"
          goToCheckContactMe={goToCheckContactMe}
        />
      )}

      {currentStep === 'contact-me.buyer' && (
        <CheckContactMeScreen
          check={checkState}
          goToAllDone={goToAllDone}
          role="buyer"
        />
      )}

      {currentStep === 'contact-me.sender' && (
        <CheckContactMeScreen
          check={checkState}
          goToAllDone={goToAllDone}
          role="sender"
        />
      )}

      {currentStep === 'all-done' && <CheckAllDoneScreen />}
    </div>
  );
}

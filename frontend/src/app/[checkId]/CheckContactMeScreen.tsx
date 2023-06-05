import { Button } from '@/components/Button/Button';
import CheckPageLayout from './page.layout';
import styles from './styles.module.css';
import { ChangeEvent, useEffect, useState } from 'react';
import { setCheckState, useAmountOwed } from './check.state';
import { checkService } from '@/services/check/check.service';
import {
  PaymentMethodContainer,
  PaymentProvider,
} from '@/components/PaymentMethodContainer/PaymentMethodInput';
import { ButtonWrapper } from '@/components/ButtonWrapper/ButtonWrapper';
import { appendZero } from '@/utils/appendZero';
import { CMCheck } from '@/services/check/check.types';
import { UserRole } from './page.client';

interface CheckContactMeScreenProps {
  check: CMCheck;
  goToAllDone: () => void;
  role: UserRole;
}

interface BuyerPaymentInfoCardProps {
  paymentType: PaymentProvider;
  onClick: () => void;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  value: string | null;
  role: UserRole;
}

function BuyerPaymentInfoCard({
  paymentType,
  onClick,
  onChange,
  value,
  role,
}: BuyerPaymentInfoCardProps) {
  return (
    <ButtonWrapper onClick={onClick}>
      <PaymentMethodContainer type={paymentType}>
        {role === 'buyer' ? (
          <input
            className={`${styles.paymentInput}`}
            value={value ?? ''}
            onChange={onChange}
          />
        ) : (
          <span className={`${styles.paymentUsername}`}>{value}</span>
        )}
      </PaymentMethodContainer>
    </ButtonWrapper>
  );
}

export function CheckContactMeScreen({
  check,
  goToAllDone,
  role,
}: CheckContactMeScreenProps) {
  const amountOwed = useAmountOwed();

  const [isValid, setIsValid] = useState(false);

  const [venmo, setVenmo] = useState('');
  const [zelle, setZelle] = useState('');
  const [message, setMessage] = useState('');

  const handleCopyLink = async () => {
    const checkCopy = { ...check };
    checkCopy.paymentMethod = {
      venmo: venmo ?? null,
      zelle: zelle ?? null,
    };
    checkCopy.finalized = true;
    checkCopy.message = message ?? null;

    // save this to firebase
    await checkService.editCheck(checkCopy.id, checkCopy);

    // copy link
    await navigator.clipboard.writeText(window.location.href);

    setCheckState(checkCopy);

    goToAllDone();
  };

  const copyPayment = async (paymentProvider: PaymentProvider) => {
    const providerUsername =
      paymentProvider === 'venmo'
        ? check.paymentMethod.venmo
        : check.paymentMethod.zelle;

    if (role === 'buyer' || !providerUsername) return;

    await navigator.clipboard.writeText(providerUsername);
  };

  useEffect(() => {
    setIsValid(!!venmo.trim() || !!zelle.trim());
  }, [venmo, zelle]);

  return (
    <CheckPageLayout
      title={role === 'buyer' ? 'Add payment methods' : 'Send your money!'}
      alert={
        role === 'sender' && check.message
          ? {
              title: `Message from ${check.buyer}`,
              message: check.message,
              type: 'success',
            }
          : undefined
      }
      subtitle={
        role === 'buyer'
          ? 'Add your Venmo or Zelle here so everyone knows how to send you money. You can also write an optional message.'
          : `${check.buyer}'s ${check.paymentMethod.venmo ? 'Venmo' : ''}${
              check.paymentMethod.venmo && check.paymentMethod.zelle
                ? ' and '
                : ''
            }${
              check.paymentMethod.zelle ? 'Zelle' : ''
            } information is below. Go
            ahead and click on either box to copy their username for the
            respective app.`
      }
      primaryAction={
        role === 'buyer' ? (
          <Button onClick={handleCopyLink} fullWidth disabled={!isValid}>
            Copy Link
          </Button>
        ) : (
          <></>
        )
      }
    >
      <div className={styles.checkContactMeContentBody}>
        {role === 'sender' && (
          <div className={styles.owe}>
            <span className={styles.oweLabel}>You owe {check.buyer}</span>
            <span className={styles.oweAmount}>${appendZero(amountOwed!)}</span>
          </div>
        )}

        <div className={styles.paymentMethods}>
          {(role === 'buyer' || !!check.paymentMethod.venmo) && (
            <BuyerPaymentInfoCard
              paymentType="venmo"
              onClick={() => copyPayment('venmo')}
              onChange={(e) => setVenmo(e.target.value)}
              role={role}
              value={role === 'buyer' ? venmo : check.paymentMethod.venmo}
            />
          )}

          {(role === 'buyer' || !!check.paymentMethod.zelle) && (
            <BuyerPaymentInfoCard
              paymentType="zelle"
              onClick={() => copyPayment('zelle')}
              onChange={(e) => setZelle(e.target.value)}
              role={role}
              value={role === 'buyer' ? zelle : check.paymentMethod.zelle}
            />
          )}
        </div>
        {role === 'buyer' && (
          <div className={styles.messageContainer}>
            <label>Optional Message</label>
            <textarea
              onChange={(e) => setMessage(e.target.value)}
              value={message}
            />
          </div>
        )}
      </div>
    </CheckPageLayout>
  );
}

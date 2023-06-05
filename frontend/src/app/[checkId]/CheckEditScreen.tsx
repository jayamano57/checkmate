import { Button } from '@/components/Button/Button';
import { CMCheck, CMCheckItem } from '@/services/check/check.types';
import styles from './styles.module.css';
import CheckPageLayout from './page.layout';
import { CheckEditItem } from '@/components/CheckEditItem/CheckEditItem';
import { useEffect, useMemo, useRef, useState } from 'react';
import { setCheckState, setCheckTax, setCheckTip } from './check.state';
import { CheckEditableAmountInput } from '@/components/CheckEditableAmountInput/CheckEditableAmountInput';
import { appendZero } from '@/utils/appendZero';
import { IconPlus } from '@tabler/icons-react';
import { ButtonWrapper } from '@/components/ButtonWrapper/ButtonWrapper';
import { v4 as uuid } from 'uuid';
import { numberOrNull } from '@/utils/numberOrNull';

interface CheckEditScreenProps {
  check: CMCheck;
  goToCheckItemChooser: () => void;
}

export function CheckEditScreen({
  check,
  goToCheckItemChooser,
}: CheckEditScreenProps) {
  const checkItemsListRef = useRef<HTMLDivElement>(null);

  const [isValid, setIsValid] = useState(false);

  const totalAmount = useMemo(() => {
    const itemsSum = check.items.reduce((prev, curr) => {
      const totalAmount = curr.totalAmount ?? 0;
      return prev + curr.quantity * totalAmount;
    }, 0);

    const tax = check.totalTax
      ? isNaN(check.totalTax)
        ? 0
        : check.totalTax
      : 0;

    const tip = check.tip ?? 0;

    return itemsSum + tax + tip;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [check, check.items, check.tip, check.totalTax]);

  const addItem = () => {
    const items: CMCheckItem[] = [
      ...check.items,
      {
        id: uuid(),
        description: '',
        claimedCount: 0,
        quantity: 1,
        totalAmount: null,
        unitPrice: null,
        owner: null,
      },
    ];
    const updatedCheck = { ...check, items };
    setCheckState(updatedCheck);
  };

  const removeItem = (itemId: string) => {
    const checkCopy = { ...check };
    const item = checkCopy.items.find((item) => item.id === itemId);
    if (!item) return;

    if (item.quantity > 1) {
      item.quantity -= 1;

      setCheckState(checkCopy);
      return;
    }

    const items = check.items.filter((item) => item.id !== itemId);
    const updatedCheck = { ...check, items };
    setCheckState(updatedCheck);
  };

  const handleOnNext = () => {
    setCheckState({ ...check, totalAmount });
    goToCheckItemChooser();
  };

  useEffect(() => {
    if (!checkItemsListRef.current) return;

    checkItemsListRef.current.scrollTop =
      checkItemsListRef.current.scrollHeight;
  }, [check.items]);

  // Validation Check
  useEffect(() => {
    const missingItemTitle = check.items.some((i) => !i.description.trim());
    const missingItemPrice = check.items.some((i) => i.totalAmount === null);

    const missingTax = check.totalTax === null || isNaN(check.totalTax);
    const missingTip = check.tip === null || isNaN(check.tip);

    const isInvalid =
      missingItemTitle || missingItemPrice || missingTax || missingTip;

    setIsValid(!isInvalid);
  }, [check.items, check.tip, check.totalTax]);

  return (
    <CheckPageLayout
      title="Edit the check"
      subtitle={
        <>
          Verify that the values are correct and make any changes if necessary.
          {check && typeof check.image === 'string' && (
            <>
              <br />
              You can also view the original receipt{' '}
              <a className={styles.link} href={check.image} target="_blank">
                here.
              </a>
            </>
          )}
        </>
      }
      primaryAction={
        <Button onClick={handleOnNext} fullWidth disabled={!isValid}>
          Looks Right!
        </Button>
      }
    >
      <div className={styles.editCheckContentBody}>
        <div
          className={`scrollbar-hide ${styles.checkItemsList}`}
          ref={checkItemsListRef}
        >
          {check.items.map((item, i) => {
            return (
              <CheckEditItem
                key={`${item.id}`}
                id={item.id}
                title={item.description}
                price={item.totalAmount}
                quantity={item.quantity}
                removeItem={() => removeItem(item.id)}
              />
            );
          })}
          <ButtonWrapper
            className={styles.addItem}
            title="Delete this item"
            onClick={addItem}
          >
            <IconPlus />
          </ButtonWrapper>
        </div>
        <div className={styles.totalsBox}>
          <div className={styles.editableTotals}>
            <CheckEditableAmountInput
              label="Tax"
              value={check.totalTax}
              onChange={(e) =>
                setCheckTax(numberOrNull(e.target.valueAsNumber))
              }
            />
            <div>
              <CheckEditableAmountInput
                label="Tip"
                value={check.tip}
                onChange={(e) =>
                  setCheckTip(numberOrNull(e.target.valueAsNumber))
                }
              />
            </div>
          </div>
          <div className={styles.total}>
            Total: ${appendZero(Math.round(totalAmount * 100) / 100)}
          </div>
        </div>
      </div>
    </CheckPageLayout>
  );
}

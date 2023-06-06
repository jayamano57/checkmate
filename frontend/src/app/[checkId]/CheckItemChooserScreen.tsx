import { Button } from '@/components/Button/Button';
import CheckPageLayout from './page.layout';
import styles from './styles.module.css';
import { setCheckState, setSenderAmountOwed } from './check.state';
import { useEffect, useMemo, useState } from 'react';
import { CheckItemSelect } from '@/components/CheckItemSelect/CheckItemSelect';
import { appendZero } from '@/utils/appendZero';
import { checkService } from '@/services/check/check.service';
import { CMCheck } from '@/services/check/check.types';
import { UserRole } from './page.client';

interface CheckItemChooserScreenProps {
  check: CMCheck;
  role: UserRole;
  goToCheckContactMe: (role: UserRole) => void;
}

export function CheckItemChooserScreen({
  check,
  role,
  goToCheckContactMe,
}: CheckItemChooserScreenProps) {
  const [isValid, setIsValid] = useState(false);
  const [selected, setSelected] = useState<{ [key: string]: number }>({});
  const [partySize, setPartySize] = useState<number | null>(null);
  const [name, setName] = useState('');

  const taxOwed = useMemo(() => {
    return (
      Math.floor(((check.totalTax ?? 0) / (check.partySize ?? 1)) * 100) / 100
    );
  }, [check.partySize, check.totalTax]);

  const tipOwed = useMemo(() => {
    return Math.floor((check.tip ?? 0) / (check.partySize ?? 1));
  }, [check.partySize, check.tip]);

  const totalNetAmount = useMemo(() => {
    let sum = 0;

    for (const key in selected) {
      const value = selected[key];
      const item = check.items.find((item) => item.id === key);
      if (!item) continue;

      sum += (item?.totalAmount ?? 0) * value;
    }
    return sum;
  }, [check.items, selected]);

  const amountOwed = useMemo(() => {
    return appendZero(
      Math.floor((totalNetAmount + taxOwed + tipOwed) * 100) / 100
    );
  }, [taxOwed, tipOwed, totalNetAmount]);

  const primaryButtonText = useMemo(() => {
    if (role === 'buyer') return 'Next';

    return `Send ${check.buyer} $${amountOwed}`;
  }, [amountOwed, check.buyer, role]);

  const handleOnSelect = (id: string) => {
    const selectedCopy = { ...selected };

    if (!selectedCopy[id]) {
      selectedCopy[id] = 1;
      setSelected(selectedCopy);
      return;
    }

    const selectedItem = [...check.items].find((item) => item.id === id);

    // if already selected and there are more than 1 of these items, we want to increase (and add a number badge)
    if (
      selectedItem &&
      selectedItem.quantity > 1 &&
      selectedItem.quantity >= selectedItem.claimedCount + selectedCopy[id] + 1
    ) {
      selectedCopy[id] += 1;
      setSelected(selectedCopy);
      return;
    }

    // Remove Logic
    if (
      selectedItem &&
      selectedItem.quantity > 1 &&
      selectedItem.quantity < selectedItem.claimedCount + selectedCopy[id] + 1
    ) {
      delete selectedCopy[id];
      setSelected(selectedCopy);
      return;
    }

    if (selectedItem && selectedItem.quantity === 1) {
      delete selectedCopy[id];
      setSelected(selectedCopy);
      return;
    }
  };

  const handlePrimaryAction = async () => {
    const checkCopy = { ...check };
    checkCopy.items = checkCopy.items.map((item) => {
      if (selected[item.id]) {
        item.owner = item.owner
          ? [...item.owner, { name, count: selected[item.id] }]
          : [{ name, count: selected[item.id] }];

        item.claimedCount += selected[item.id];
      }
      return item;
    });

    if (role === 'buyer') {
      checkCopy.buyer = name;
      checkCopy.partySize = partySize;
      goToCheckContactMe('buyer');
    }

    if (role === 'sender') {
      await checkService.editCheck(checkCopy.id, checkCopy);
      setSenderAmountOwed(
        typeof amountOwed === 'string' ? parseFloat(amountOwed) : amountOwed
      );
    }

    setCheckState(checkCopy);
    goToCheckContactMe(role);
  };

  useEffect(() => {
    const hasSelected =
      Object.keys(selected).length > 0 &&
      Object.values(selected).every((val) => val > 0);

    if (role === 'buyer') {
      setIsValid(
        hasSelected && partySize !== null && partySize > 0 && !!name.trim()
      );
      return;
    }

    setIsValid(hasSelected && !!name.trim());
  }, [name, partySize, role, selected]);

  return (
    <CheckPageLayout
      title="Choose your items"
      subtitle={
        <>
          Select the items that belong to you.
          {check && typeof check.image === 'string' && (
            <>
              <br />
              You can also view the original receipt{' '}
              <a className={styles.link} href={check.image} target="_blank">
                here.
              </a>
            </>
          )}
          <br />
          <br />
          Tax = ${check.totalTax} (total tax) / {check.partySize} (party size) =
          ${appendZero(taxOwed)}
          <br />
          Tip = ${check.tip} (total tip) / {check.partySize} (party size) = $
          {appendZero(tipOwed)}
        </>
      }
      primaryAction={
        <Button onClick={handlePrimaryAction} fullWidth disabled={!isValid}>
          {primaryButtonText}
        </Button>
      }
    >
      <div className={styles.checkItemContentBody}>
        <div className={`scrollbar-hide ${styles.checkItemsSelectList}`}>
          {check.items.map((item) => (
            <CheckItemSelect
              key={item.id}
              id={item.id}
              title={item.description}
              price={item.totalAmount}
              claimedCount={item.claimedCount}
              selectedCount={selected[item.id]}
              quantity={item.quantity}
              owner={item.owner}
              selected={!!selected[item.id]}
              onSelect={() => handleOnSelect(item.id)}
            />
          ))}
        </div>
        <div className={styles.inputs}>
          {role === 'buyer' && (
            <div className={styles.inputContainer}>
              <label className={styles.label}>How many in your party?</label>
              <input
                type="number"
                className={styles.input}
                value={partySize ?? ''}
                onChange={(e) => setPartySize(e.target.valueAsNumber)}
              />
            </div>
          )}

          <div className={styles.inputContainer}>
            <label className={styles.label}>What&apos;s your name?</label>
            <input
              className={styles.input}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>
      </div>
    </CheckPageLayout>
  );
}

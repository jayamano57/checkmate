import { appendZero } from '@/utils/appendZero';
import { ButtonWrapper } from '../ButtonWrapper/ButtonWrapper';
import styles from './styles.module.css';
import { useMemo } from 'react';
import { ItemOwner } from '@/services/check/check.types';
import { NumberBadge } from '../NumberBadge/NumberBadge';

interface CheckItemSelectProps {
  id: string;
  title: string;
  price: number | null;
  quantity: number;
  claimedCount: number;
  selectedCount: number;
  owner: ItemOwner[] | null;
  selected: boolean;
  onSelect: () => void;
}

export function CheckItemSelect({
  id,
  title,
  price,
  quantity,
  claimedCount,
  selectedCount,
  owner,
  selected,
  onSelect,
}: CheckItemSelectProps) {
  const disabled = useMemo(() => {
    return quantity === claimedCount;
  }, [quantity, claimedCount]);
  return (
    <div className={styles.checkItemSelectorContainer}>
      <ButtonWrapper
        activeStyles={false}
        className={styles.buttonWrapper}
        onClick={onSelect}
        disabled={disabled}
      >
        <div
          className={`${styles.checkItemSelect} ${
            selected ? styles.selected : ''
          } ${disabled ? styles.disabled : ''}`}
        >
          <div className={styles.title}>
            {quantity > 1 && selectedCount > 1 && (
              <div className={styles.numberBadgeWrapper}>
                <NumberBadge value={selectedCount} theme="light" />
              </div>
            )}

            {title}
            {quantity > 1 ? (
              <span className={styles.quantity}>({quantity})</span>
            ) : (
              ''
            )}
          </div>
          <div className={styles.price}>${appendZero(price ?? 0)}</div>
        </div>
      </ButtonWrapper>
      <span className={styles.ownersList}>
        {owner
          ?.map((o) => {
            return `${
              quantity === 1
                ? o.name
                : `${o.name}${o.count > 1 ? ` (${o.count})` : ''}`
            }`;
          })
          .join(', ')}
      </span>
    </div>
  );
}

import {
  setCheckItemPrice,
  setCheckItemTitle,
} from '@/app/[checkId]/check.state';
import styles from './styles.module.css';
import { IconTrashXFilled } from '@tabler/icons-react';
import { ButtonWrapper } from '../ButtonWrapper/ButtonWrapper';
import { numberOrNull } from '@/utils/numberOrNull';
import { NumberBadge } from '../NumberBadge/NumberBadge';

interface CheckEditItemProps {
  id: string;
  title: string | null;
  price: number | null;
  quantity: number;
  removeItem: () => void;
}

export function CheckEditItem({
  id,
  title,
  price,
  quantity,
  removeItem,
}: CheckEditItemProps) {
  return (
    <div className={styles.checkEditItem}>
      <ButtonWrapper
        className={styles.trashBtn}
        title="Delete this item"
        onClick={removeItem}
      >
        <IconTrashXFilled size={22} color="red" className={styles.trashIcon} />
      </ButtonWrapper>
      <div className={styles.checkEditTitleContainer}>
        {quantity > 1 && (
          <div className={styles.numberBadgeWrapper}>
            <NumberBadge value={quantity} theme="dark" />
          </div>
        )}
        <input
          className={`${styles.checkEditInput} ${styles.checkEditTitle}`}
          type="text"
          value={title ?? ''}
          onChange={(e) => setCheckItemTitle(id, e.target.value)}
        />
      </div>

      <input
        className={`${styles.checkEditInput} ${styles.checkEditPrice}`}
        type="number"
        value={price ?? ''}
        onChange={(e) => {
          setCheckItemPrice(id, numberOrNull(e.target.valueAsNumber));
        }}
      />
    </div>
  );
}

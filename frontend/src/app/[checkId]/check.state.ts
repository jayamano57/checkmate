import { CMCheck } from '@/services/check/check.types';
import { create } from 'zustand';

interface SenderStore {
  amountOwed: number | null;
}

const initialState: CMCheck = {
  id: '',
  image: null,
  finalized: false,
  buyer: null,
  partySize: null,
  message: null,
  paymentMethod: {
    venmo: null,
    zelle: null,
  },
  items: [],
  totalAmount: null,
  totalNet: null,
  totalTax: null,
  tip: null,
};

const checkStore = create((): CMCheck => initialState);
const senderStore = create((): SenderStore => ({ amountOwed: null }));

export function useCheckState() {
  return checkStore((state) => state);
}

export function setCheckState(check: CMCheck): void {
  checkStore.setState(check);
}

export function setCheckItemTitle(checkItem: string, value: string): void {
  checkStore.setState((state) => ({
    ...state,
    items: state.items.map((item) => {
      if (item.id !== checkItem) return item;

      return {
        ...item,
        description: value,
      };
    }),
  }));
}

export function setCheckItemPrice(
  checkItem: string,
  value: number | null
): void {
  checkStore.setState((state) => ({
    ...state,
    items: state.items.map((item) => {
      if (item.id !== checkItem) return item;

      return {
        ...item,
        totalAmount: value,
      };
    }),
  }));
}

export function setCheckTip(tip: number | null): void {
  checkStore.setState((state) => ({
    ...state,
    tip,
  }));
}

export function setCheckTax(tax: number | null): void {
  checkStore.setState((state) => ({
    ...state,
    totalTax: tax,
  }));
}

export function setCheckPaymentMethod(venmo?: string, zelle?: string): void {
  checkStore.setState((state) => ({
    ...state,
    paymentMethod: { venmo: venmo ?? null, zelle: zelle ?? null },
  }));
}

export function getCheckState(): CMCheck {
  return checkStore.getState();
}

// Sender State
export function useAmountOwed(): number | null {
  return senderStore((state) => state.amountOwed);
}

export function setSenderAmountOwed(amountOwed: number): void {
  senderStore.setState((state) => ({
    ...state,
    amountOwed,
  }));
}

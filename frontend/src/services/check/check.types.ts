import { CheckItem } from '../ocr/ocr.types';

export interface ItemOwner {
  name: string;
  count: number;
}
export interface CMCheckItem extends CheckItem {
  owner: ItemOwner[] | null;
  claimedCount: number;
}

export interface CMCheck {
  id: string;
  finalized: boolean;
  image: string | Blob | null;
  message: string | null;
  buyer: string | null;
  partySize: number | null;
  paymentMethod: {
    venmo: string | null;
    zelle: string | null;
  };
  items: CMCheckItem[];
  totalAmount: number | null;
  totalNet: number | null;
  totalTax: number | null;
  tip: number | null;
}

export interface CheckService {
  uploadCheckImage(
    checkId: string,
    file: Blob,
    onUpload?: (progress: number) => void
  ): Promise<string>;
  addCheck(check: CMCheck): Promise<void>;
  editCheck(id: string, check: CMCheck): Promise<void>;
  getCheck(id: string): Promise<CMCheck>;
}

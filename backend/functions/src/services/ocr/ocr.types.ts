export interface OCRService {
  analyze(file: string): void;
}

export interface Item {
  description: string;
  quantity: number;
  totalAmount: number;
  unitPrice: number | null;
}

export interface Receipt {
  items: Item[];
  date: string;
  total: number;
  totalNet: number;
  totalTax: number;
  tip: number | null;
  supplierName: string | null;
}

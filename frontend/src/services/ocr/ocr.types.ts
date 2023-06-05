export interface OCRService {
  analyze(file: string): Promise<Check>;
}

interface TotalObject {
  value: number;
}

export interface CheckItem {
  id: string;
  description: string;
  quantity: number;
  totalAmount: number | null;
  unitPrice: number | null;
}

export interface Check {
  lineItems: CheckItem[];
  date: string;
  totalAmount: TotalObject;
  totalNet: TotalObject;
  totalTax: TotalObject;
  tip: TotalObject | null;
  supplierName: string | null;
}

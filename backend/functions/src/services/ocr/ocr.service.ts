import { OCRService } from './ocr.types';
import * as mindee from 'mindee';
import * as dotenv from 'dotenv';

dotenv.config();

const mindeeClient = new mindee.Client({ apiKey: process.env.MINDEE_KEY });

class OCRServiceImpl implements OCRService {
  constructor(private ocrProvider: mindee.Client) {}

  async analyze(file: string): Promise<mindee.ReceiptV5 | undefined> {
    const doc = this.ocrProvider.docFromUrl(file);
    const receiptDoc = await doc.parse(mindee.ReceiptV5);

    if (receiptDoc.document === undefined) return;

    return receiptDoc.document;
  }
}

export const ocrService = new OCRServiceImpl(mindeeClient);

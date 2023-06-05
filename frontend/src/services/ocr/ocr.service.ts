import { OCRService, Check } from './ocr.types';

class OCRServiceImpl implements OCRService {
  constructor() {}

  async analyze(file: string): Promise<Check> {
    const resp = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/ocr`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ file }),
    });
    const json = await resp.json();
    return json;
  }
}

export const ocrService = new OCRServiceImpl();

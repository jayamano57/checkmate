import express from 'express';
import { ocrService } from '../services/ocr/ocr.service';
const router = express.Router();

router.post('/', async function (req, res, next) {
  const doc = await ocrService.analyze(req.body.file);
  res.json(doc);
});

export default router;

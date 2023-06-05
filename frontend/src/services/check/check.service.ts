import { CMCheck, CheckService } from './check.types';
import { firebaseStorage } from '@/firebase';
import { StorageService } from '../storage/storage.types';
import { storageService } from '../storage/storage.service';
import { DatabaseService } from '../db/db.types';
import { databaseService } from '../db/db.service';

const COLLECTION_NAME = 'checks';

export class CheckServiceImpl implements CheckService {
  constructor(
    private storageService: StorageService,
    private databaseService: DatabaseService
  ) {}

  async uploadCheckImage(
    checkId: string,
    file: Blob,
    onUpload?: (progress: number) => void
  ): Promise<string> {
    const imageUrl = await this.storageService.upload(
      `checks/${checkId}`,
      file,
      onUpload
    );

    return imageUrl;
  }

  async addCheck(check: CMCheck): Promise<void> {
    await this.databaseService.add(COLLECTION_NAME, check, check.id);
  }

  async getCheck(id: string): Promise<CMCheck> {
    return await this.databaseService.get<CMCheck>(COLLECTION_NAME, id);
  }

  async editCheck(id: string, check: CMCheck): Promise<void> {
    await this.databaseService.update(COLLECTION_NAME, check, check.id);
  }

  observeCheck(id: string, observe: (data: any) => void) {
    return this.databaseService.observe(COLLECTION_NAME, observe, id);
  }
}

export const checkService = new CheckServiceImpl(
  storageService,
  databaseService
);

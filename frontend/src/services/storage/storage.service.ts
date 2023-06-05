import { firebaseStorage } from '@/firebase';
import { StorageService } from './storage.types';
import {
  FirebaseStorage,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';

export class StorageServiceImpl implements StorageService {
  constructor(private storage: FirebaseStorage) {}

  async upload(
    pathName: string,
    file: Blob,
    onUpload?: (progress: number) => void
  ): Promise<string> {
    const storageRef = ref(this.storage, pathName);
    const uploadTask = uploadBytesResumable(storageRef, file);
    return new Promise((resolve, reject) => {
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

          onUpload?.(progress);
        },
        (error) => {
          reject(error);
        },
        async () => {
          const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
          resolve(downloadUrl);
        }
      );
    });
  }
}

export const storageService = new StorageServiceImpl(firebaseStorage);

export interface StorageService {
  upload(
    fileName: string,
    file: Blob,
    onUpload?: (progress: number) => void
  ): Promise<string>;
}

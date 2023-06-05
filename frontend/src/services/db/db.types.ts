export interface DatabaseService {
  add(
    collectionPath: string,
    data: { [x: string]: any },
    docId?: string
  ): Promise<void>;
  update(
    collectionPath: string,
    data: { [x: string]: any },
    docId: string
  ): Promise<void>;
  get<T>(collectionPath: string, docId: string): Promise<T>;
  observe(
    collectionPath: string,
    observer: (state: any) => void,
    docId?: string
  ): () => void;
}

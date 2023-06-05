import {
  DocumentData,
  Firestore,
  addDoc,
  collection,
  doc,
  getDoc,
  onSnapshot,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { DatabaseService } from './db.types';
import { firebaseDb } from '@/firebase';

export class DatabaseServiceImpl implements DatabaseService {
  constructor(private db: Firestore) {}

  async add(
    collectionPath: string,
    data: { [x: string]: any },
    docId?: string
  ): Promise<void> {
    if (docId) {
      await setDoc(doc(this.db, collectionPath, docId), data);
      return;
    }

    await addDoc(collection(this.db, collectionPath), data);
    return;
  }

  async update(
    collectionPath: string,
    data: { [x: string]: any },
    docId: string
  ): Promise<void> {
    await updateDoc(doc(this.db, collectionPath, docId), data);
    return;
  }

  async get<T>(collectionPath: string, docId: string): Promise<T> {
    const docRef = doc(this.db, collectionPath, docId);
    const docSnap = await getDoc(docRef);

    return docSnap.data() as T;
  }

  observe(
    collectionPath: string,
    observer: (state: any) => void,
    docId?: string
  ): () => void {
    const document = docId
      ? doc(this.db, collectionPath, docId)
      : doc(this.db, collectionPath);

    const unsub = onSnapshot(document, (doc) => {
      observer(doc.data());
    });

    return unsub;
  }
}

export const databaseService = new DatabaseServiceImpl(firebaseDb);

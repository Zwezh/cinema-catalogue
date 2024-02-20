import { DocumentChangeAction } from '@angular/fire/compat/firestore';

export const extractDocumentHelper = <T>(x: DocumentChangeAction<unknown>, addId = true): T => {
  const data = x.payload.doc.data() as unknown & { id: string };
  if (addId) {
    data.id = x.payload.doc.id;
  }
  return data as T;
};

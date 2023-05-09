import { DocumentChangeAction } from '@angular/fire/compat/firestore';

interface Item {
  [key: string]: any;
  id?: string;
}

export const extractDocumentHelper = (x: DocumentChangeAction<any>, addId = true): Item => {
  const data = x.payload.doc.data();
  if (addId) {
    data.id = x.payload.doc.id;
  }
  return data;
};

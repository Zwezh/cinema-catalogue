import { inject, Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference, QueryFn } from '@angular/fire/compat/firestore';
import { deleteDoc, doc, docData, Firestore, updateDoc } from '@angular/fire/firestore';

import { map, Observable } from 'rxjs';

import { extractDocumentHelper } from '../helpers/extract-document.helper';

@Injectable({ providedIn: 'root' })
export abstract class FireApiService {
  protected readonly firestore = inject(Firestore);
  protected readonly aFirestore = inject(AngularFirestore);

  readonly #collectionName: string;

  protected constructor(collectionName: string) {
    this.#collectionName = collectionName;
  }

  protected getAll$<DataContract>(queryFn?: QueryFn): Observable<DataContract[]> {
    return this.aFirestore
      .collection(this.#collectionName, queryFn)
      .snapshotChanges()
      .pipe(map((changes) => changes.map((x) => extractDocumentHelper<DataContract>(x))));
  }

  protected getById$<DataContract extends { id: string }>(id: string): Observable<DataContract> {
    return docData(this.#getDocumentRef(id), { idField: 'id' }) as Observable<DataContract>;
  }

  protected add$<T>(dataContract: T): Observable<unknown> {
    return new Observable((observer) => {
      this.aFirestore
        .collection(this.#collectionName)
        .add(dataContract)
        .then((result: DocumentReference) => {
          observer.next(result.id);
          observer.complete();
        })
        .catch((result) => {
          observer.error(result);
          observer.complete();
        })
        .finally(() => {
          observer.complete();
        });
    });
  }

  protected update$<T extends { id: string }>(dataContract: T): Observable<void> {
    const docRef = this.#getDocumentRef(dataContract.id);
    return new Observable((observer) => {
      updateDoc(docRef, { ...dataContract })
        .then((result) => {
          observer.next(result);
          observer.complete();
        })
        .catch((err) => {
          observer.error(err);
        })
        .finally(() => {
          observer.complete();
        });
    });
  }
  protected delete$<T extends { id: string }>(dataContract: T): Observable<void> {
    const docRef = this.#getDocumentRef(dataContract.id);
    return new Observable((observer) => {
      deleteDoc(docRef)
        .then((result) => {
          observer.next(result);
          observer.complete();
        })
        .catch((err) => {
          observer.error(err);
        })
        .finally(() => {
          observer.complete();
        });
    });
  }

  #getDocumentRef(id: string) {
    return doc(this.firestore, `${this.#collectionName}/${id}`);
  }
}

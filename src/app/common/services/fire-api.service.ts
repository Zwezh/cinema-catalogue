import { inject, Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/compat/firestore';
import { QueryFn } from '@angular/fire/compat/firestore/interfaces';
import { doc, docData, Firestore, updateDoc } from '@angular/fire/firestore';

import { map, Observable } from 'rxjs';

import { extractDocumentHelper } from '../helpers/extract-document.helper';

@Injectable({ providedIn: 'root' })
export abstract class FireApiService {
  protected readonly firestore = inject(Firestore);
  protected readonly aFirestore = inject(AngularFirestore);

  readonly #collectionName: string;

  constructor(collectinName: string) {
    this.#collectionName = collectinName;
  }

  protected getAll$<DataContract>(queryFn?: QueryFn): Observable<DataContract> {
    return this.aFirestore
      .collection(this.#collectionName, queryFn)
      .snapshotChanges()
      .pipe(
        map((changes) => changes.map((x) => extractDocumentHelper(x))),
        map((res) => res as DataContract)
      );
  }

  protected getById$<DataContract>(id: string): Observable<DataContract> {
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
    const docRef = doc(this.firestore, `${this.#collectionName}/${dataContract.id}`);
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
  //
  // delete(id: string) {
  //   const docRef = doc(this.firestore, `${this.#collectionName}/${dataContract.id}`);
  //   const pokemonDocumentReference = doc(this.firestore, `pokemon/${id}`);
  //   return deleteDoc(pokemonDocumentReference);
  // }
  //
  #getDocumentRef(id: string) {
    return doc(this.firestore, `${this.#collectionName}/${id}`);
  }
}

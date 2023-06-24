import { inject, Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { doc, docData, Firestore } from '@angular/fire/firestore';

import { map, Observable, of, tap } from 'rxjs';

import { extractDocumentHelper } from '../helpers/extract-document.helper';

@Injectable({ providedIn: 'root' })
export abstract class FireApiService {
  protected readonly firestore = inject(Firestore);
  protected readonly aFirestore = inject(AngularFirestore);

  readonly #collectionName: string;

  constructor(collectinName: string) {
    this.#collectionName = collectinName;
  }

  protected getAll<DataContract>(): Observable<DataContract> {
    return this.aFirestore
      .collection('movies')
      .snapshotChanges()
      .pipe(
        map((changes) => changes.map((x) => extractDocumentHelper(x))),
        map((res) => res as DataContract)
      );
  }

  protected getById<DataContract>(id: string): Observable<DataContract> {
    return docData(this.#getDocumentRef(id), { idField: 'id' }) as Observable<DataContract>;
  }

  //
  // create(dataContract: DataContract): Observable<DataContract> {
  //   return new Observable((observer) => {
  //     this.#collectionRef
  //       .add(dataContract)
  //       .then((result) => {
  //         observer.next(result);
  //         observer.complete();
  //       })
  //       .catch((result) => {
  //         observer.error(result);
  //         observer.complete();
  //       });
  //   });
  // }
  //
  // update<T = unknown & { id: string }>(dataContract: T): Promise<void> {
  //   const docRef = doc(this.firestore, `${this.#collectionName}/${dataContract.id}`);
  //   return updateDoc(docRef, { ...pokemon });
  // }
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

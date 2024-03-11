import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';

export abstract class BaseApiService {
  protected readonly httpClient = inject(HttpClient);
  protected readonly url: string;

  protected constructor(suffix: string) {
    this.url = `api/${suffix}`;
  }
}

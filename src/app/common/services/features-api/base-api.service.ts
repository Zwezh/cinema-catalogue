import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { ENVIRONMENT } from '@appTokens';
import { Environment } from '@appTypes';

export abstract class BaseApiService {
  protected readonly httpClient = inject(HttpClient);
  protected readonly url: string;
  #environment: Environment = inject(ENVIRONMENT);
  protected constructor(suffix: string) {
    this.url = `${this.#environment.apiUrl}/${suffix}`;
  }
}

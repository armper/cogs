import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ISameCode } from 'app/shared/model/same-code.model';

type EntityResponseType = HttpResponse<ISameCode>;
type EntityArrayResponseType = HttpResponse<ISameCode[]>;

@Injectable({ providedIn: 'root' })
export class SameCodeService {
  public resourceUrl = SERVER_API_URL + 'api/same-codes';

  constructor(protected http: HttpClient) {}

  create(sameCode: ISameCode): Observable<EntityResponseType> {
    return this.http.post<ISameCode>(this.resourceUrl, sameCode, { observe: 'response' });
  }

  update(sameCode: ISameCode): Observable<EntityResponseType> {
    return this.http.put<ISameCode>(this.resourceUrl, sameCode, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ISameCode>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ISameCode[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}

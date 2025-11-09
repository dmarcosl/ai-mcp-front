import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {UiSpec} from '../ui-spec/ui-spec.service';

export interface AgentApiResponse {
  assistantText: string;
  uiSpec?: UiSpec;
}

@Injectable({providedIn: 'root'})
export class AgentService {
  constructor(
    private http: HttpClient,
    @Inject('AGENT_BASE_URL') private baseUrl: string
  ) {
  }

  chat(prompt: string): Observable<AgentApiResponse> {
    return this.http
      .post(`${this.baseUrl}/agent`, {prompt}, {responseType: 'text'})
      .pipe(
        map(raw => {
          try {
            const obj = JSON.parse(raw) as AgentApiResponse;
            return obj?.assistantText ? obj : {assistantText: raw};
          } catch {
            return {assistantText: raw} as AgentApiResponse;
          }
        })
      );
  }
}

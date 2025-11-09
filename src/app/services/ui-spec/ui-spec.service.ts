import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

export type UiSpec =
  | { type: 'table'; title?: string; columns: { id: string; header: string }[]; rows: Record<string, any>[] }
  | { type: 'bar'; title?: string; labels: string[]; data: number[] }
  | { type: 'pie'; title?: string; labels: string[]; data: number[] };

@Injectable({providedIn: 'root'})
export class UiSpecService {
  private spec$ = new BehaviorSubject<UiSpec | null>(null);

  get(): Observable<UiSpec | null> {
    return this.spec$.asObservable();
  }

  set(spec: UiSpec | null) {
    this.spec$.next(spec);
  }
}

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { format } from 'date-fns';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root',
})
export class DateTimeService {
    private currentDateTimeSubject: BehaviorSubject<Date> = new BehaviorSubject(new Date());
    currentDateTime$: Observable<string> = this.currentDateTimeSubject.asObservable().pipe(map(date => format(date, 'dd/MM/yyyy HH:mm:ss'))); // Formatear la fecha y hora
  
    updateCurrentDateTime(): void {
      this.currentDateTimeSubject.next(new Date());
    }
}

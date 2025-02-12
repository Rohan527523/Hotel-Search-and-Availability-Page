import { HttpInterceptorFn } from '@angular/common/http';
import { HttpErrorResponse, HttpRequest, HttpHandlerFn } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

export const httpInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn): Observable<any> => {
  const modifiedReq = req.clone({
    setHeaders: {
      Authorization: `${environment.authToken}`,
      'Content-Type': 'application/json',
    },
  });

  return next(modifiedReq).pipe(
    catchError((error: HttpErrorResponse) => {
      console.error('HTTP Error:', error);
      return throwError(() => new Error(error.message));
    })
  );
};

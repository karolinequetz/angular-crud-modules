import { Injectable } from '@angular/core';
import { Student } from './student';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { catchError, delay, finalize, mergeMap, scan } from 'rxjs/operators';
import { Observable, of, throwError, retryWhen } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StudentsService {
  apiUrl = `${environment.apiUrl}/studentss`;
  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) {}

  save(student: Student) {
    this.spinner.show();
    return this.http.post<Student>(this.apiUrl, student).pipe(
      delay(1000),
      catchError((err) => this.exceptionHandler(err)),
      finalize(() => this.spinner.hide())
    );
  }

  update(id: number, student: Student) {
    this.spinner.show();
    return this.http.put<Student>(`${this.apiUrl}/${id}`, student).pipe(
      delay(1000),
      catchError((err) => this.exceptionHandler(err)),
      finalize(() => this.spinner.hide())
    );
  }

  deleteById(id: number) {
    this.spinner.show();
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      delay(1000),
      catchError((err) => this.exceptionHandler(err)),
      finalize(() => this.spinner.hide())
    );
  }

  findById(id: number) {
    this.spinner.show();
    return this.http.get<Student>(`${this.apiUrl}/${id}`).pipe(
      delay(1000),
      catchError((err) => this.exceptionHandler(err)),
      finalize(() => this.spinner.hide())
    );
  }

  findAll() {
    this.spinner.show();
    return this.http.get<Student[]>(this.apiUrl).pipe(
      delay(1000),
      retryWhen((err) => this.retryHandler(err)),
      catchError((err) => this.exceptionHandler(err)),
      finalize(() => this.spinner.hide())
    );
  }

  private exceptionHandler(error: HttpErrorResponse) {
    this.toastr.error(error.message, `${error.status} - ${error.statusText}`);
    return throwError(() => error);
  }

  private retryHandler(error: Observable<any>) {
    return error.pipe(
      delay(1000),
      mergeMap((err) => {
        if (err.status < 500) {
          return of(err);
        }
        return throwError(() => error);
      }),
      scan((acc, err) => {
        if (acc > 5) {
          throw err;
        }
        this.toastr.warning(
          `Retrying the request #${acc}`,
          `${err.status} - Retrying `
        );

        return ++acc;
      }, 1)
    );
  }
}

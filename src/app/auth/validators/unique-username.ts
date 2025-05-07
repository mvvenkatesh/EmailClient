import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AbstractControl, AsyncValidator, ValidationErrors } from "@angular/forms";
import { catchError, map, Observable, of } from "rxjs";
import { AuthService } from "../auth.service";


@Injectable({ providedIn: 'root' })
export class UniqueUsername implements AsyncValidator {
    constructor(private authService: AuthService) { }
    validate = (control: AbstractControl) => {
        const { value } = control;
        return this.authService.userNameAvailable(value).pipe(
            map((value) => {
                return null;
            }),
            catchError((err) => {
                if (err.error.username) {
                    return of({ noUniqueUserName: true });
                }
                else {
                    return of({ noInternetConnection: true });
                }
            })
        );

        throw new Error("Method not implemented.");
    }
}

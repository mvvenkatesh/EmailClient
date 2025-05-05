import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AbstractControl, AsyncValidator, ValidationErrors } from "@angular/forms";
import { Observable } from "rxjs";


@Injectable({providedIn:'root'})
export class UniqueUsername implements AsyncValidator {
    constructor(private http : HttpClient){}
    validate = (control: AbstractControl) => {
        const {value} = control;
        return this.http.post<any>('https://api.angular-email.com/auth/username',{
            username : value
        });
        
        throw new Error("Method not implemented.");
    }
}

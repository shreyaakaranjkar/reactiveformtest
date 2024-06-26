import { AbstractControl, ValidationErrors } from "@angular/forms";
import { Observable } from "rxjs";

export class AsyncEmailValidator{
    static isEMailValid(control : AbstractControl): Promise<ValidationErrors | null> 
    | Observable<ValidationErrors|null>{
        let val:string = control.value;

        const promise = new Promise<ValidationErrors | null>((resolve,reject) => {
            setTimeout(() => {
                if(val === 'john@gmail.com'){
                    resolve({
                        emailExistErr : 'Email Id already Exists!'
                    })
                }
                else{
                    resolve(null)
                }
            }, 2000);
        })
        return promise

    }
}
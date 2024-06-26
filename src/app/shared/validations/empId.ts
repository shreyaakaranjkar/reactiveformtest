import { AbstractControl, ValidationErrors } from "@angular/forms";


export class EMpIDValidator{
    static isEmpValid(control : AbstractControl):ValidationErrors | null{
        let val = control.value as string;

        if(val){
            let reg = /^[E]\d{3}$/i;
            let isValid = reg.test(val);

            return isValid ? null : {invalidMsg : 'Emp Id should start with E followed by three digits'}
        }
        else{
            return null
        }
    }
}
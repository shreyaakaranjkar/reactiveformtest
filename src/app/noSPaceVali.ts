import { AbstractControl, ValidationErrors } from "@angular/forms";

export class NoSPace{
    static noSPaceValidator(controls:AbstractControl):ValidationErrors | null{
        let val = controls.value as string;

        if(!val){
            return null;
        }
        if(val.includes(' ')){
            return {
                noSpaceAllowed : 'No Space Allowed in User Name'
            }
        }
        else{
            return null
        }
    }
}
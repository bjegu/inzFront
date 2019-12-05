import { FormControl } from '@angular/forms';

export function lengthValidator(control: FormControl){
    let regon = control.value;
    if(regon!= null && regon.length !==9 && regon.length!== 14){
        return {
            regonLength: regon || "cos"
        }
    }
    return null;
}
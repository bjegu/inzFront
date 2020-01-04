import { FormControl } from '@angular/forms';

export function lengthValidator(control: FormControl){
    let regon = control.value;
    if(regon != null){
        let value = String(regon)
        if(value.length !==9 && value.length!== 14){
            return {
                regonLength: regon || "cos"
            }
        } 
    }
    return null;
}
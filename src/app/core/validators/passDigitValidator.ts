import { AbstractControl } from "@angular/forms";

export function passDigitValidator(control: AbstractControl) :{[key: string]: boolean}| null{   
   if(control.value !== ''){
      if(control.value?.search('[0-9]') === -1){
         return { digitValid: true }
      }
   }
       return null
  }
  
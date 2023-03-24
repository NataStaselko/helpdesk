import { AbstractControl } from "@angular/forms";

export function formDateValidator(control: AbstractControl) :{[key: string]: boolean}| null{ 
   const v = control.value.length
   if(control.value !== ''){
      if(v < 3){
         if(control.value?.search('^[0-9]+$') === -1){
            return { dateValid: true }
         }
      }else if(v === 3){
         if(control.value?.search('^([0-9]{2}\\/)+$') === -1){
            return { dateValid: true }
         }
      }else if(v < 6){
         if(control.value?.search('^([0-9]{2}\\/[0-9]{1,2})+$') === -1){
            return { dateValid: true }
         }
      }else if(v === 6){
         if(control.value?.search('^([0-9]{2}\\/[0-9]{1,2}\\/)+$') === -1){
            return { dateValid: true }
         }
      }else if(v < 11){
         if(control.value?.search('^([0-9]{2}\\/[0-9]{1,2}\\/[0-9]{1,4})+$') === -1){
            return { dateValid: true }
         }
      } else{
         return { dateValid: true }
      }
       
   }
       return null
  }
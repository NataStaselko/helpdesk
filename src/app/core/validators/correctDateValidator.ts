import { AbstractControl } from "@angular/forms";

export function correctDateValidator(control: AbstractControl) :{[key: string]: boolean}| null{      
   if(control.value !== ''){
      let des = control.value.toString()
      const desDate = Number(`${des.slice(6)
          + des.slice(3,5) + des.slice(0,2)}`)

      const date = new Date()
      let day = `${date.getDate()}`
      let month = `${date.getMonth() + 1}`

      if(date.getDate() < 10){
          day = '0' + day
      }

      if(date.getMonth() + 1 < 10){
         month = '0' + month
      }

      let nowDate = Number(`${date.getFullYear() + month + day}`)

      if(desDate - nowDate < 0){
         return { correctDateValid: true }
      }
   }
       return null
  }

  
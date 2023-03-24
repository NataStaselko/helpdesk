import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CapitalLetterPipe } from './capital-letter.pipe';
import { TransformKBPipe } from './transform-kb.pipe';



@NgModule({
  declarations: [
    CapitalLetterPipe,
    TransformKBPipe
  ],
  imports: [
    CommonModule,
  ],
  exports:[
    CapitalLetterPipe,
    TransformKBPipe
  ]

})
export class PipeModule { }

import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { GloinDatepickerComponent } from './gloin-datapicker/gloin-datepicker.component';
import { MatDatepickerModule, DateAdapter, MAT_DATE_FORMATS, MatFormFieldModule} from '@angular/material';
import { CustomDateAdapter } from './adapter/date-adapter';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

const MY_DATE_FORMATS = {
  parse: {
      dateInput: {month: 'short', year: 'numeric', day: 'numeric'}
  },
  display: {
      // dateInput: { month: 'short', year: 'numeric', day: 'numeric' },
      dateInput: 'input',
      monthYearLabel: {year: 'numeric', month: 'short'},
      dateA11yLabel: {year: 'numeric', month: 'long', day: 'numeric'},
      monthYearA11yLabel: {year: 'numeric', month: 'long'},
  }
};

@NgModule({
  declarations: [GloinDatepickerComponent],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    MatDatepickerModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    ReactiveFormsModule,
  ],
  exports: [GloinDatepickerComponent],
  providers: [
    {provide : DateAdapter, useClass : CustomDateAdapter},
    {provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS},
  ]
})
export class GloinDatepickerModule { }

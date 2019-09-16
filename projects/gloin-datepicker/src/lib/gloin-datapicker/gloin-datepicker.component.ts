import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import {MatDatepicker} from '@angular/material';
import * as moment_ from 'moment';

const moment = moment_;

@Component({
  selector: 'gloin-datepicker',
  templateUrl: './gloin-datepicker.component.html',
  styleUrls: ['./gloin-datepicker.component.scss']
})
export class GloinDatepickerComponent implements OnInit, OnChanges {


  /**
   * Dom input element for date
   */
  @ViewChild('dateInput') dateInput: ElementRef;

  /**
   * Default date value in milliseconds, given by the parent component when
   */
  @Input('defaultDateValue')
  dateValueInMillis: number;

  /**
   * Flag that indicates if the inputs are disabled or not
   */
  @Input('disabled')
  isDisabled: boolean;

  /**
   * String with the placeholder that should be displayed if undefined it will display an span with today date
   */
  @Input('placeholder')
  placeholder = '(YYYY/MM/DD)';

  /**
   * Error message passed from parent
   */
  @Input('errorMessage')
  errorMessage = 'Wrong date format (YYYY/MM/DD)';

  /**
   * OnDateValidated event emitter,
   */
  @Output() onDateValidated = new EventEmitter<number>();

  /**
   * This attributes are used to avoid calendar take strange dates when writing invalid characters
   */
  @ViewChild('pickerDate') matDatePicker: MatDatepicker<Date>;

  /**
   * NgModel for input
   */
  public inputDateModel: string;

  /**
   * The selected date in Date type
   */
  private dateAsDate: Date;

  /**
   * String to show the default date value formatted as YYYY/MM/DD
   */
  private dateInitValue: string;

  /**
   * Flag is true when the user clicks whatever date input is available, in order to
   * hide the default date value (not found any other way to show the default value).
   */
  public isDateInput: boolean;

  /**
   * Flag for validating the input date format
   */
  public wrongPublicationDate: boolean;

  /**
   * This both flags are used to achieve particular requirements for request criteria component
   * and are based on "placeholder" definition, so if placeholder is not defined both flags
   * will be true
   */
  public shouldSelectDefaultDate: boolean;

  /**
   * Will display span if true or show placeholder if false
   */
  public shouldDisplaySpan: boolean;

  constructor() {
    this.wrongPublicationDate = false;
    this.isDateInput = false;
  }

  ngOnInit(): void {
    console.log(this.placeholder);
    console.log(this.dateValueInMillis);

    if (this.placeholder === undefined) {
      // -- the dev doesn't inject any placeholder
      if (this.dateValueInMillis !== undefined) {
        // -- the dev doesn't inject any init date value
        this.dateAsDate = new Date(this.dateValueInMillis);
        this.placeholder = this.addLeadingZerosToDate(this.dateAsDate.getFullYear()
          + '/'
          + (this.dateAsDate.getMonth() + 1)
          + '/'
          + this.dateAsDate.getDate());
      }
    }

    this.initDatePickerValue();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.ngOnInit();
  }

  /**
   * Initializes the date picker inputs values and formats
   */
  private initDatePickerValue() {
    // -- create Date object from the input date value in milliseconds

    if (this.dateValueInMillis === undefined) {
      this.shouldSelectDefaultDate = false;
      this.dateAsDate = null;
    } else {
      this.dateAsDate = new Date(this.dateValueInMillis);
      this.shouldSelectDefaultDate = true;
    }

    if (this.dateAsDate != null) {
      // -- get the YYYY/MM/DD format from the just created date
      this.dateInitValue = this.addLeadingZerosToDate(this.dateAsDate.getFullYear()
        + '/'
        + (this.dateAsDate.getMonth() + 1)
        + '/'
        + this.dateAsDate.getDate());

      // -- initialize the matDatePicker default value
      if (this.shouldSelectDefaultDate) {
        console.log('init date picker');
        this.matDatePicker.select(this.dateAsDate);
      }
    }
  }

  /**
   * Checks the date input field
   * @param $event the user input event
   */
  checkDateFormat($event) {
    if ($event.value == null) {

      const fixedDate = this.addLeadingZerosToDate(
        this.dateInput.nativeElement.value);

      if (!moment(fixedDate, 'YYYY/MM/DD', true).isValid()) {
        this.dateValueInMillis = null;
        // this.dateInput.nativeElement.value = '';
        this.wrongPublicationDate = true;
      } else {
        this.wrongPublicationDate = false;
      }
    }

  }

  /**
   * Validates the date picker selected date format
   * @param $event the picker selected date event
   */
  inputPickerDatePublication($event) {

    this.isDateInput = true;
    if ($event.value != null && (moment(
      this.addLeadingZerosToDate(this.dateInput.nativeElement.value),
      'YYYY/MM/DD', true).isValid())) {
      this.dateValueInMillis = $event.value.getTime();
      this.wrongPublicationDate = false;
      this.onDateValidated.emit(this.dateValueInMillis);
    } else {
      this.dateValueInMillis = null;
      this.wrongPublicationDate = true;
      this.onDateValidated.emit(null);
    }
  }

  /**
   * Live validation of user input
   * @param $event the user pressed key event
   */
  dateKeyDown($event) {
    this.isDateInput = true;
    if ($event.key !== '/') {
      if ($event.key < 0 || $event.key) {

        this.wrongPublicationDate = true;
      }
    }
  }

  /**
   * Final validation when the user focus out form inputs or pickers
   * if date is wrong, it will nullify attributes and emit a null value
   * so it can be managed at parent components
   */
  checkDateOnFocusOut() {
    console.log('h');

    if (this.isDateInput) {
      if (this.inputDateModel == null) {
        this.wrongPublicationDate = true;
      } else {
        if (this.wrongPublicationDate) {
          this.dateValueInMillis = null;
          // this.dateInput.nativeElement.value = '';
          this.onDateValidated.emit(null);
        }
      }
    }
    if (this.dateInput.nativeElement.value == '') {
      this.wrongPublicationDate = false;
    }
  }

  /**
   * Will remove date input text and calendar selected date
   */
  clearInput() {
    this.dateInput.nativeElement.value = '';
    this.inputDateModel = null;
  }


  /**
   * Will add leading zeros to year month and day so field fits YYYY/MM/DD format
   * @param rawDate, the date in a raw string var
   * @returns string
   */
  addLeadingZerosToDate(rawDate: string) {

    if (rawDate.indexOf('/') != null && (rawDate.indexOf('/') != rawDate.lastIndexOf('/'))) {
      var year = rawDate.slice(0,
        rawDate.indexOf('/'));
      if (year.length < 4) {
        while (year.length < 4) {
          year = '0' + year;
        }
      }
      let firstMonthChar = rawDate.indexOf('/') + 1;
      let month = rawDate.slice(firstMonthChar, rawDate.lastIndexOf('/'));

      if (month.length < 2) {
        while (month.length < 2) {
          month = '0' + month;
        }
      }
      var fistDayChar = rawDate.lastIndexOf('/') + 1;
      var day = rawDate.slice(fistDayChar, rawDate.length);

      if (day.length < 2) {
        while (day.length < 2) {
          day = '0' + day;
        }
      }

      const fixedDate = year + '/' + month + '/' + day;
      return fixedDate;
    }
    return null;
  }
}

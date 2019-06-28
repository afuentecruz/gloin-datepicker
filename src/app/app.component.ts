import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  initDate: Date;

  title = 'Gloin datepicker lib';

  datePickerValue: number;

  constructor() {
  }

  ngOnInit(): void {
    this.datePickerValue = null;
    this.initDate = new Date(1466329148000);
  }

  public loadDate($event): void {
    this.datePickerValue = $event;
  }

  public displayDate(): string {
    return new Date(this.datePickerValue).toDateString();
  }
}

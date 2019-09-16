
# GloinDatepicker  
  
An improved version of the material datepicker with custom date format, live date validation and custom messages  
## Usage  

    <gloin-datepicker  
      [defaultDateValue]="1466329148000"  
      [placeholder]="'Write date (YYYY/MM/DD)'"  
      [errorMessage]="'You are not cool'"  
      (onDateValidated)="loadDate($event)">  
    </gloin-datepicker>
      


|Property|Type|Default value|Description|
|--|--|--|--|
|defaultDateValue|number|null| the init value you want to be shown as default in the input and selected in the MatDatePicker component
|placeholder|string|(YYYY/MM/DD)| The placeholder string to be shown in the input 
|disabled|boolean|false| Allows to enable/disable the input, allowing the input react to parent events
|errorMessage|string|Wrong date format (YYYY/MM/DD)|A custom error message string, shown when the date format is invalid
|onDateValidated|Event emitter|null|Emits the date value in **milliseconds** when it's validated

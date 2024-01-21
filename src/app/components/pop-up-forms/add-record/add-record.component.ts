import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AssignmentsService } from '../../../services/assignments/assignments.service';
import { Record } from '../../../models/record/record';
import moment from 'moment';
import { RecordsService } from '../../../services/records/records.service';

interface CheckboxInput {
  label: string;
  value: boolean;
}
@Component({
  selector: 'app-add-record',
  templateUrl: './add-record.component.html',
  styleUrl: './add-record.component.scss',
})

export class AddRecordComponent {
  form!: FormGroup;
  assignmentTitles: string[] = [];

  constructor(
    private dialogRef: MatDialogRef<AddRecordComponent>,
    private fb: FormBuilder,
    private assignmentsService: AssignmentsService,
    private recordsService: RecordsService
  ) {}

  ngOnInit(): void {
    this.assignmentsService.getTitles().subscribe((topics) => {
      this.assignmentTitles = topics;
      this.initializeForm();
    });
  }
  initializeForm() {
    this.form = this.fb.group({
      selectedOptions: this.fb.array([]),
    });
    this.assignmentTitles.forEach((label) => {
      const checkboxGroup = this.fb.group({
        label: label,
        value: false,
      });
      (this.form.get('selectedOptions') as FormArray).push(checkboxGroup);
    });
  }
  get selectedOptions(): FormArray {
    return this.form.get('selectedOptions') as FormArray;
  }
  getFormControl(index: number): FormControl {
    return (this.form.get('selectedOptions') as FormArray)
      .at(index)
      .get('value') as FormControl;
  }
  onSubmit() {
    this.dialogRef.close();
    const formValues: CheckboxInput[] = this.form.value.selectedOptions;
    const formattedDate = moment(new Date()).format('DD/MM/YYYY');
    const transformedArray = formValues.map(({ label, value }) => ({ [label]: value }));
    const record = new Record(formattedDate, transformedArray);
    this.recordsService.createRecord(record).subscribe(el => {
      console.log("Registered Record!!!");
      
    });
  }
}

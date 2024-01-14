import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormArray,
  FormControl,
} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AssignmentsService } from '../../../../services/assignments/assignments.service';

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
    private assignmentsService: AssignmentsService
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
    return (this.form.get('selectedOptions') as FormArray).at(index).get('value') as FormControl;
  }
  onSubmit() {
    this.dialogRef.close();
    const { selectedOptions } = this.form.value;
    console.log('Selected values:', selectedOptions);
  }
}

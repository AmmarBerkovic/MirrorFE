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

    this.assignmentTitles.forEach((option, index) => {
      const control = this.fb.control(false);
      (this.form.get('selectedOptions') as FormArray).push(control);
    });
  }
  get selectedOptions(): FormArray {
    return this.form.get('selectedOptions') as FormArray;
  }
  // onCheckChange(event: Event) {
  //   console.log(event.target);
  // }
  onSubmit() {
    this.dialogRef.close();
    const selectedValues = this.form.value.selectedOptions;

    console.log('Selected values:', selectedValues);
  }
}

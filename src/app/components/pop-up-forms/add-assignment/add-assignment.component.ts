import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Assignment } from '../../../models/assignment/assignment';
import { AssignmentsService } from '../../../services/assignments/assignments.service';

@Component({
  selector: 'app-add-assignment',
  templateUrl: './add-assignment.component.html',
  styleUrl: './add-assignment.component.scss',
})
export class AddAssignmentComponent {
  form!: FormGroup;
  constructor(
    private dialogRef: MatDialogRef<AddAssignmentComponent>,
    private formBuilder: FormBuilder,
    private assignmentsService: AssignmentsService
  ) {
    this.form = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      topic: ['', [Validators.required]],
      description: ['', [Validators.minLength(3)]],
    });
  }
  onSubmit() {
    this.dialogRef.close();
    const { title, topic, description } = this?.form?.value;
    const assignment = new Assignment(title, topic, description);
    this.assignmentsService.createAssignment(assignment).subscribe((assignment) => {
      console.log("Assginment created!!!");
    });
  }
}
